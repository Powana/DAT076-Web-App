FROM node:19

WORKDIR /app

COPY . .

WORKDIR client

RUN npm ci && npm run build

WORKDIR ../server

RUN npm ci

EXPOSE 8080

CMD ["npm", "run", "dev"]