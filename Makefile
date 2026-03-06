
DEV_COMPOSE_FILE = docker/compose.dev.yml

dev-build: 
	docker compose -f ${DEV_COMPOSE_FILE} --env-file .env.development build --no-cache 

dev-start: 
	docker compose -f ${DEV_COMPOSE_FILE} --env-file .env.development up --force-recreate

dev-stop: 
	docker compose -f ${DEV_COMPOSE_FILE} --env-file .env.development down