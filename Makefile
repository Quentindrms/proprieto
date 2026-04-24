
DEV_COMPOSE_FILE = docker/compose.dev.yml
TEST_COMPOSE_FILE = docker/compose.test.yml
PROD_COMPOSE_FILE = docker/compose.prod.yml

dev-build: 
	docker compose -f ${DEV_COMPOSE_FILE} --env-file .env.development build --no-cache 

dev-start: 
	docker compose -f ${DEV_COMPOSE_FILE} --env-file .env.development up --force-recreate

dev-stop: 
	docker compose -f ${DEV_COMPOSE_FILE} --env-file .env.development down

dev-restart: 
	docker compose -f ${DEV_COMPOSE_FILE} --env-file .env.development restart

test-build:
	docker compose -f $(TEST_COMPOSE_FILE) --env-file .env.test build --no-cache

test-start:
	docker compose -f $(TEST_COMPOSE_FILE) --env-file .env.test up

test-stop:
	docker compose -f $(TEST_COMPOSE_FILE) --env-file .env.test down

prod-build: 
	docker compose -f ${PROD_COMPOSE_FILE} --env-file .env.development build --no-cache 

prod-start: 
	docker compose -f ${PROD_COMPOSE_FILE} --env-file .env.development up --force-recreate

prod-stop: 
	docker compose -f ${PROD_COMPOSE_FILE} --env-file .env.development down