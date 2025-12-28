#!/bin/bash

set -e  # Arrêter en cas d'erreur

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Déploiement du frontend ===${NC}"

# Vérifier que Docker est installé
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker n'est pas installé${NC}"
    exit 1
fi

# Charger les variables d'environnement
if [ -f .env.production ]; then
    echo "Chargement des variables d'environnement..."
    export $(grep -v '^#' .env.production | xargs)
fi

# Arrêter les containers existants
echo "Arrêt des containers existants..."
docker-compose -f docker-compose.prod.yml down || true

# Construire l'image
echo "Construction de l'image Docker..."
docker-compose -f docker-compose.prod.yml build

# Démarrer les services
echo "Démarrage des services..."
docker-compose -f docker-compose.prod.yml up -d

# Vérifier la santé
echo "Vérification de la santé..."
sleep 10
if curl -f http://localhost:80/health > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Déploiement réussi${NC}"
else
    echo -e "${RED}✗ Échec du déploiement${NC}"
    exit 1
fi

# Nettoyer les anciennes images
echo "Nettoyage des anciennes images..."
docker image prune -f

echo -e "${GREEN}=== Déploiement terminé ===${NC}"