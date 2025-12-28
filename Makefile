.PHONY: help dev prod build down logs clean

help:
	@echo "Commandes disponibles:"
	@echo "  make dev     - Démarrer l'environnement de développement"
	@echo "  make prod    - Démarrer l'environnement de production"
	@echo "  make build   - Builder les images"
	@echo "  make down    - Arrêter les containers"
	@echo "  make logs    - Afficher les logs"
	@echo "  make clean   - Nettoyer tout"

dev:
	docker-compose -f docker-compose.local.yml up --build

prod:
	docker-compose -f docker-compose.prod.yml up -d

build:
	docker-compose -f docker-compose.prod.yml build --no-cache

down:
	docker-compose -f docker-compose.local.yml down
	docker-compose -f docker-compose.prod.yml down

logs:
	docker-compose -f docker-compose.local.yml logs -f

clean:
	docker system prune -f --volumes
	docker image prune -f