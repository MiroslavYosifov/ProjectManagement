FROM node:22-alpine

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY server/package.json server/
COPY client/package.json client/
COPY shared/package.json shared/
RUN pnpm install --frozen-lockfile --filter game-editor-client...

COPY shared shared
COPY client client

WORKDIR /app/client

EXPOSE 5173

CMD ["pnpm", "dev"]
