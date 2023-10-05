FROM node:lts as node

WORKDIR /node/app

COPY package*.json ./

RUN npm i

COPY . .

FROM node as prod

RUN npm run build
RUN npm run migrate

