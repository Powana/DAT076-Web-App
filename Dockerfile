FROM node:19.7.0-alpine3.17 AS builder

WORKDIR /app

COPY . .

WORKDIR client

RUN npm ci && npm run build

WORKDIR ../server

RUN npm ci

EXPOSE 8080

CMD ["npm", "run", "dev"]