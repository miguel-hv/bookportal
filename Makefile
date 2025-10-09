# Makefile
#view logs: docker compose logs
#frontend logs tail: docker compose logs -f frontend
#open backend shell inside container: docker compose exec backend /bin/bash
#open frontend shell inside container: docker compose exec frontend sh
.PHONY: up down prod

# Default target
up:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build

# Stop and remove containers
down:
	docker compose down

# Production build
prod:
	docker compose up --build
