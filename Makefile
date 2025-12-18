COMPOSE = docker compose
MIGRATION_NAME ?= new_migration

.PHONY: up upb down logs migrate makemigrations admin psql

up:
	$(COMPOSE) up --build

upb:
	$(COMPOSE) up --build backend db

down:
	$(COMPOSE) down

logs:
	$(COMPOSE) logs -f

migrate:
	$(COMPOSE) run --rm backend alembic upgrade head

makemigrations:
	$(COMPOSE) run --rm backend alembic revision --autogenerate -m "$(MIGRATION_NAME)"

admin:
	$(COMPOSE) exec backend /bin/sh

psql:
	$(COMPOSE) exec db psql -U sober_helper -d sober_helper
