FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node --watch server.js"]
