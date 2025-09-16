# Workspace Booking Frontend - Makefile
# Quick commands for development and deployment

.PHONY: help install dev build test clean docker-build docker-dev docker-prod docker-stop lint type-check

# Default target
.DEFAULT_GOAL := help

# Variables
PROJECT_NAME = workspace-booking-frontend
DOCKER_IMAGE = $(PROJECT_NAME)
DOCKER_TAG = latest

## Help
help: ## Show this help message
	@echo "$(PROJECT_NAME) - Available commands:"
	@echo ""
	@awk 'BEGIN {FS = ":.*##"; printf "\033[36m\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

##@ Development
install: ## Install dependencies
	npm install

dev: ## Start development server
	npm run dev

build: ## Build for production
	npm run build

preview: ## Preview production build
	npm run preview

##@ Testing
test: ## Run tests
	npm run test

test-ui: ## Run tests with UI
	npm run test:ui

test-coverage: ## Run tests with coverage
	npm run test:coverage

##@ Code Quality
lint: ## Run linter
	npm run lint

lint-fix: ## Fix linting issues
	npm run lint:fix

type-check: ## Run TypeScript type checking
	npm run type-check

##@ Docker
docker-build: ## Build production Docker image
	docker build -t $(DOCKER_IMAGE):$(DOCKER_TAG) .

docker-dev: ## Run development environment with Docker
	docker-compose --profile dev up --build

docker-prod: ## Run production environment with Docker
	docker-compose up --build

docker-start: ## Start Docker services in background
	docker-compose up -d

docker-stop: ## Stop Docker services
	docker-compose down

docker-logs: ## View Docker logs
	docker-compose logs -f frontend

docker-shell: ## Access container shell
	docker-compose exec frontend sh

##@ Cleanup
clean: ## Clean build artifacts and dependencies
	rm -rf dist
	rm -rf node_modules
	rm -rf coverage

clean-docker: ## Clean Docker images and containers
	docker-compose down --rmi all --volumes --remove-orphans
	docker system prune -f

##@ Quick Start
start: install dev ## Quick start: install dependencies and run dev server

start-docker: docker-prod ## Quick start with Docker

##@ Maintenance
update: ## Update dependencies
	npm update

audit: ## Security audit
	npm audit

audit-fix: ## Fix security vulnerabilities
	npm audit fix