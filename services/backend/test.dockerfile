FROM node:22-alpine 

WORKDIR /app

RUN corepack enable pnpm 

COPY package.json pnpm-lock.yaml ./

RUN pnpm install 

COPY . .

CMD ["pnpm", "test"]