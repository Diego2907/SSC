# Script de deployment para PRODUCCION (shc.com.mx)
# Uso: .\scripts\deploy-production.ps1

param(
    [string]$ServerUser = "root",
    [string]$ServerIP = "",
    [string]$ServerPath = "/var/www/ssc/production"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "DEPLOYMENT PRODUCCION - shc.com.mx" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ([string]::IsNullOrEmpty($ServerIP)) {
    $ServerIP = Read-Host "Ingresa la IP del servidor"
}

if ([string]::IsNullOrEmpty($ServerIP)) {
    Write-Host "Error: Se requiere la IP del servidor" -ForegroundColor Red
    exit 1
}

Write-Host "Servidor: $ServerUser@$ServerIP" -ForegroundColor Yellow
Write-Host "Ruta: $ServerPath" -ForegroundColor Yellow
Write-Host ""
Write-Host "ADVERTENCIA: Estas desplegando a PRODUCCION" -ForegroundColor Red
$confirm = Read-Host "¿Estas seguro? (escribe 'si' para continuar)"
if ($confirm -ne "si") {
    Write-Host "Deployment cancelado" -ForegroundColor Yellow
    exit 0
}
Write-Host ""

# 1. Construir backend
Write-Host "[1/6] Construyendo backend..." -ForegroundColor Green
Set-Location "server"
npm install
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error al construir el backend" -ForegroundColor Red
    exit 1
}
Set-Location ".."

# 2. Construir frontend para produccion
Write-Host "[2/6] Construyendo frontend para produccion..." -ForegroundColor Green
Set-Location "Client"
Copy-Item "env.production.example" ".env" -Force
npm install
npm run build:production
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error al construir el frontend" -ForegroundColor Red
    exit 1
}
Set-Location ".."

# 3. Subir backend al servidor
Write-Host "[3/6] Subiendo backend al servidor..." -ForegroundColor Green
scp -r server/dist $ServerUser@${ServerIP}:${ServerPath}/backend/
scp -r server/package.json $ServerUser@${ServerIP}:${ServerPath}/backend/
scp -r server/package-lock.json $ServerUser@${ServerIP}:${ServerPath}/backend/
scp -r server/ecosystem.production.config.cjs $ServerUser@${ServerIP}:${ServerPath}/backend/ecosystem.config.cjs
scp -r server/env.production.example $ServerUser@${ServerIP}:${ServerPath}/backend/.env.example

# 4. Subir frontend al servidor
Write-Host "[4/6] Subiendo frontend al servidor..." -ForegroundColor Green
ssh $ServerUser@${ServerIP} "mkdir -p ${ServerPath}/frontend/dist"
scp -r Client/dist/* $ServerUser@${ServerIP}:${ServerPath}/frontend/dist/

# 5. Instalar dependencias y reiniciar backend en el servidor
Write-Host "[5/6] Instalando dependencias y reiniciando backend..." -ForegroundColor Green
ssh $ServerUser@${ServerIP} @"
cd ${ServerPath}/backend
if [ ! -f .env ]; then
    cp .env.example .env
    echo 'IMPORTANTE: Edita el archivo .env con tus credenciales reales'
fi
npm install --production
pm2 stop ssc-backend-production 2>/dev/null || true
pm2 start ecosystem.config.cjs --name ssc-backend-production
pm2 save
"@

# 6. Reiniciar Nginx
Write-Host "[6/6] Reiniciando Nginx..." -ForegroundColor Green
ssh $ServerUser@${ServerIP} "sudo nginx -t && sudo systemctl reload nginx"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "DEPLOYMENT COMPLETADO" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "Produccion disponible en: https://shc.com.mx" -ForegroundColor Cyan
Write-Host ""
