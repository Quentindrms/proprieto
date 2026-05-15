FROM node:22-alpine 

WORKDIR /app

RUN npm install -g pnpm@10

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

CMD ["pnpm", "test"]