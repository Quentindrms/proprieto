FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN DATABASE_URL=postgresql://placeholder:placeholder@localhost:5432/placeholder pnpm prisma generate --config prisma.config.ts
RUN pnpm build

FROM node:22-alpine

WORKDIR /app

RUN corepack enable pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod
RUN pnpm add prisma --save-dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

EXPOSE 4000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main"]