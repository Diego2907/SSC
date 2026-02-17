#!/bin/bash

# Script de deployment para Hostinger VPS
# Uso: ./deploy-hostinger.sh [backend|frontend|all]

set -e  # Salir si hay algún error

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Variables de configuración (AJUSTAR SEGÚN TU SERVIDOR)
SERVER_USER="tu_usuario"
SERVER_HOST="tu_ip_o_dominio"
SERVER_PATH="/var/www/ssc"
BACKEND_PATH="$SERVER_PATH/backend"
FRONTEND_PATH="$SERVER_PATH/frontend"

# Función para mostrar mensajes
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Función para deploy del backend
deploy_backend() {
    log_info "Iniciando deployment del backend..."
    
    # Construir el backend
    log_info "Construyendo backend..."
    cd server
    npm install --production
    npm run build
    
    # Crear directorio de logs si no existe
    mkdir -p logs
    
    # Subir archivos al servidor
    log_info "Subiendo archivos al servidor..."
    rsync -avz --delete \
        --exclude 'node_modules' \
        --exclude '.git' \
        --exclude 'src' \
        --exclude 'tests' \
        --exclude '*.test.ts' \
        dist/ \
        ecosystem.config.cjs \
        package.json \
        package-lock.json \
        .env \
        "$SERVER_USER@$SERVER_HOST:$BACKEND_PATH/"
    
    # Ejecutar comandos en el servidor
    log_info "Reiniciando aplicación en el servidor..."
    ssh "$SERVER_USER@$SERVER_HOST" << 'ENDSSH'
        cd /var/www/ssc/backend
        npm install --production
        pm2 restart ssc-backend || pm2 start ecosystem.config.cjs
        pm2 save
ENDSSH
    
    log_info "Backend desplegado exitosamente!"
}

# Función para deploy del frontend
deploy_frontend() {
    log_info "Iniciando deployment del frontend..."
    
    # Construir el frontend
    log_info "Construyendo frontend..."
    cd Client
    npm install
    npm run build
    
    # Subir archivos al servidor
    log_info "Subiendo archivos al servidor..."
    rsync -avz --delete \
        dist/ \
        "$SERVER_USER@$SERVER_HOST:$FRONTEND_PATH/dist/"
    
    log_info "Frontend desplegado exitosamente!"
}

# Función para deploy completo
deploy_all() {
    log_info "Iniciando deployment completo..."
    deploy_backend
    deploy_frontend
    log_info "Deployment completo finalizado!"
}

# Verificar argumentos
case "${1:-all}" in
    backend)
        deploy_backend
        ;;
    frontend)
        deploy_frontend
        ;;
    all)
        deploy_all
        ;;
    *)
        log_error "Uso: $0 [backend|frontend|all]"
        exit 1
        ;;
esac

log_info "Deployment completado!"

