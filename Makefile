# Makefile
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
