FROM node:lts as node

WORKDIR /node/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build