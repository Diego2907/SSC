#!/bin/bash

# Script para deploy a Staging (todos los ingenieros pueden usar)
# Uso: ./scripts/deploy-staging.sh

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}🚀 Iniciando deploy a Staging...${NC}"
echo ""

# Verificar que Railway CLI está instalado
if ! command -v railway &> /dev/null; then
    echo -e "${RED}❌ Railway CLI no está instalado${NC}"
    echo -e "${YELLOW}Instala con: npm install -g @railway/cli${NC}"
    exit 1
fi

# Verificar que Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI no está instalado${NC}"
    echo -e "${YELLOW}Instala con: npm install -g vercel${NC}"
    exit 1
fi

# Backend
echo -e "${YELLOW}📦 Deploying Backend...${NC}"
cd server
railway up
cd ..

echo -e "${GREEN}✅ Backend deployado${NC}"
echo ""

# Frontend
echo -e "${YELLOW}📦 Deploying Frontend...${NC}"
cd Client
vercel --prod
cd ..

echo ""
echo -e "${GREEN}✅ Deploy completo a Staging!${NC}"
echo ""
echo -e "${CYAN}🔗 Links:${NC}"
echo -e "  Backend:  https://ssc-backend-staging.up.railway.app"
echo -e "  Frontend: https://ssc-staging.vercel.app"
echo ""
echo -e "${YELLOW}💡 Comparte estos links con tu equipo para que vean los cambios${NC}"







