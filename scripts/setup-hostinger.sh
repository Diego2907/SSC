#!/bin/bash

# Script de setup inicial para Hostinger VPS
# Ejecutar UNA SOLA VEZ en el servidor para configurar el ambiente

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_info "Iniciando setup del servidor Hostinger..."

# 1. Actualizar sistema
log_info "Actualizando sistema..."
sudo apt update && sudo apt upgrade -y

# 2. Instalar Node.js (si no está instalado)
if ! command -v node &> /dev/null; then
    log_info "Instalando Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
else
    log_info "Node.js ya está instalado: $(node --version)"
fi

# 3. Instalar PM2 globalmente
if ! command -v pm2 &> /dev/null; then
    log_info "Instalando PM2..."
    sudo npm install -g pm2
    pm2 startup systemd -u $USER --hp $HOME
else
    log_info "PM2 ya está instalado"
fi

# 4. Instalar MySQL (si no está instalado)
if ! command -v mysql &> /dev/null; then
    log_info "Instalando MySQL..."
    sudo apt install -y mysql-server
    log_warn "IMPORTANTE: Configura la contraseña de MySQL con: sudo mysql_secure_installation"
else
    log_info "MySQL ya está instalado"
fi

# 5. Instalar Nginx (si no está instalado)
if ! command -v nginx &> /dev/null; then
    log_info "Instalando Nginx..."
    sudo apt install -y nginx
    sudo systemctl enable nginx
    sudo systemctl start nginx
else
    log_info "Nginx ya está instalado"
fi

# 6. Crear directorios del proyecto
log_info "Creando directorios del proyecto..."
sudo mkdir -p /var/www/ssc/{backend,frontend}
sudo chown -R $USER:$USER /var/www/ssc

# 7. Crear directorio de logs
mkdir -p /var/www/ssc/backend/logs

# 8. Configurar firewall (opcional)
log_info "Configurando firewall..."
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw --force enable

log_info "Setup básico completado!"
log_warn "Próximos pasos:"
log_warn "1. Configura MySQL y crea la base de datos"
log_warn "2. Copia el archivo .env al directorio backend"
log_warn "3. Copia la configuración de Nginx a /etc/nginx/sites-available/ssc"
log_warn "4. Crea el symlink: sudo ln -s /etc/nginx/sites-available/ssc /etc/nginx/sites-enabled/"
log_warn "5. Prueba la configuración: sudo nginx -t"
log_warn "6. Reinicia Nginx: sudo systemctl restart nginx"

