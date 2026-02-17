# Script para migrar a estructura develop limpia
# Uso: .\scripts\migrate-to-develop.ps1

Write-Host "🔄 Migrando a estructura develop..." -ForegroundColor Cyan
Write-Host ""

# Verificar que estamos en un repo git
if (-not (Test-Path .git)) {
    Write-Host "❌ No estás en un repositorio Git" -ForegroundColor Red
    exit 1
}

# Verificar que no hay cambios sin commitear
$status = git status --porcelain
if ($status) {
    Write-Host "⚠️  Tienes cambios sin commitear:" -ForegroundColor Yellow
    Write-Host $status
    Write-Host ""
    $confirm = Read-Host "¿Quieres continuar de todas formas? (s/n)"
    if ($confirm -ne "s") {
        Write-Host "❌ Migración cancelada" -ForegroundColor Yellow
        exit 0
    }
}

# Paso 1: Asegurarse de tener dev-back actualizado
Write-Host "📥 Actualizando dev-back..." -ForegroundColor Yellow
git fetch origin dev-back
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  No se pudo obtener dev-back del remoto" -ForegroundColor Yellow
    Write-Host "Continuando con dev-back local..." -ForegroundColor Yellow
}

# Paso 2: Crear develop desde dev-back
Write-Host ""
Write-Host "🌿 Creando develop desde dev-back..." -ForegroundColor Yellow

# Verificar si develop ya existe
$developExists = git branch --list develop
if ($developExists) {
    Write-Host "⚠️  La rama develop ya existe" -ForegroundColor Yellow
    $confirm = Read-Host "¿Quieres eliminarla y recrearla? (s/n)"
    if ($confirm -eq "s") {
        git branch -D develop
    } else {
        Write-Host "❌ Migración cancelada" -ForegroundColor Yellow
        exit 0
    }
}

git checkout dev-back
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error: No existe la rama dev-back" -ForegroundColor Red
    exit 1
}

git checkout -b develop
Write-Host "✅ develop creada desde dev-back" -ForegroundColor Green

# Paso 3: Mergear dev-front
Write-Host ""
Write-Host "📦 Mergeando dev-front a develop..." -ForegroundColor Yellow

git fetch origin dev-front
git merge dev-front --no-ff -m "chore: merge dev-front a develop"

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "⚠️  Hay conflictos que resolver manualmente" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Pasos para resolver:" -ForegroundColor Cyan
    Write-Host "  1. Resuelve los conflictos en los archivos marcados"
    Write-Host "  2. git add ."
    Write-Host "  3. git commit -m 'chore: resolver conflictos merge dev-front'"
    Write-Host "  4. git push -u origin develop"
    Write-Host ""
    Write-Host "O cancela el merge: git merge --abort" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ dev-front mergeado exitosamente" -ForegroundColor Green

# Paso 4: Verificar que develop tiene el código
Write-Host ""
Write-Host "🔍 Verificando archivos en develop..." -ForegroundColor Yellow

$files = git ls-tree -r develop --name-only
$hasBackend = $files | Where-Object { $_ -like "server/*" }
$hasFrontend = $files | Where-Object { $_ -like "Client/*" }

if (-not $hasBackend) {
    Write-Host "⚠️  Advertencia: No se encontraron archivos de backend" -ForegroundColor Yellow
}

if (-not $hasFrontend) {
    Write-Host "⚠️  Advertencia: No se encontraron archivos de frontend" -ForegroundColor Yellow
}

if ($hasBackend -and $hasFrontend) {
    Write-Host "✅ develop tiene código de backend y frontend" -ForegroundColor Green
}

# Paso 5: Push develop
Write-Host ""
Write-Host "📤 ¿Quieres hacer push de develop al remoto?" -ForegroundColor Cyan
$push = Read-Host "Push develop? (s/n)"

if ($push -eq "s") {
    git push -u origin develop
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ develop pusheada al remoto" -ForegroundColor Green
    } else {
        Write-Host "❌ Error al hacer push" -ForegroundColor Red
    }
}

# Resumen
Write-Host ""
Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ Migración completada" -ForegroundColor Green
Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Próximos pasos:" -ForegroundColor Yellow
Write-Host "  1. Verificar que develop tiene TODO el código necesario"
Write-Host "  2. Configurar Railway con branch 'develop' para staging"
Write-Host "  3. Configurar Railway con branch 'main' para producción"
Write-Host "  4. Probar deploy de staging"
Write-Host "  5. Informar al equipo sobre la nueva estructura"
Write-Host "  6. Eliminar ramas viejas (después de verificar):"
Write-Host "     git push origin --delete dev dev-back dev-front"
Write-Host ""
Write-Host "🔗 Rama actual: develop" -ForegroundColor Cyan







