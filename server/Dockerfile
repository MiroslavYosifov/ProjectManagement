FROM node:22-alpine

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY server/package.json server/
COPY client/package.json client/
COPY shared/package.json shared/
RUN pnpm install --frozen-lockfile --filter game-editor...

COPY shared shared
COPY server server

WORKDIR /app/server

EXPOSE 3000

CMD ["sh", "-c", "pnpm exec prisma migrate deploy && pnpm dev"]
