# Script de deployment para Hostinger VPS (PowerShell)
# Uso: .\deploy-hostinger.ps1 [backend|frontend|all]

param(
    [Parameter(Position=0)]
    [ValidateSet("backend", "frontend", "all")]
    [string]$Target = "all"
)

$ErrorActionPreference = "Stop"

# Variables de configuración (AJUSTAR SEGÚN TU SERVIDOR)
$SERVER_USER = "tu_usuario"
$SERVER_HOST = "tu_ip_o_dominio"
$SERVER_PATH = "/var/www/ssc"
$BACKEND_PATH = "$SERVER_PATH/backend"
$FRONTEND_PATH = "$SERVER_PATH/frontend"

# Función para mostrar mensajes
function Write-Info {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Green
}

function Write-Warn {
    param([string]$Message)
    Write-Host "[WARN] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Función para deploy del backend
function Deploy-Backend {
    Write-Info "Iniciando deployment del backend..."
    
    # Construir el backend
    Write-Info "Construyendo backend..."
    Set-Location server
    npm install --production
    npm run build
    
    # Crear directorio de logs si no existe
    if (-not (Test-Path "logs")) {
        New-Item -ItemType Directory -Path "logs" | Out-Null
    }
    
    # Subir archivos al servidor (requiere rsync o scp)
    Write-Info "Subiendo archivos al servidor..."
    Write-Warn "NOTA: Asegúrate de tener rsync instalado o usa scp manualmente"
    
    # Ejemplo con scp (ajustar según tu configuración)
    # scp -r dist/* ecosystem.config.cjs package.json package-lock.json .env "$SERVER_USER@${SERVER_HOST}:$BACKEND_PATH/"
    
    # Ejecutar comandos en el servidor
    Write-Info "Reiniciando aplicación en el servidor..."
    $sshCommand = @"
cd $BACKEND_PATH
npm install --production
pm2 restart ssc-backend || pm2 start ecosystem.config.cjs
pm2 save
"@
    
    ssh "$SERVER_USER@$SERVER_HOST" $sshCommand
    
    Set-Location ..
    Write-Info "Backend desplegado exitosamente!"
}

# Función para deploy del frontend
function Deploy-Frontend {
    Write-Info "Iniciando deployment del frontend..."
    
    # Construir el frontend
    Write-Info "Construyendo frontend..."
    Set-Location Client
    npm install
    npm run build
    
    # Subir archivos al servidor
    Write-Info "Subiendo archivos al servidor..."
    # scp -r dist/* "$SERVER_USER@${SERVER_HOST}:$FRONTEND_PATH/dist/"
    
    Set-Location ..
    Write-Info "Frontend desplegado exitosamente!"
}

# Función para deploy completo
function Deploy-All {
    Write-Info "Iniciando deployment completo..."
    Deploy-Backend
    Deploy-Frontend
    Write-Info "Deployment completo finalizado!"
}

# Ejecutar según el target
switch ($Target) {
    "backend" {
        Deploy-Backend
    }
    "frontend" {
        Deploy-Frontend
    }
    "all" {
        Deploy-All
    }
}

Write-Info "Deployment completado!"

