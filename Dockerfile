FROM node:12-alpine as build-step

WORKDIR /app

COPY package.json /app

COPY . /app

RUN npm install & npx prisma generate

RUN npm install -g ts-node

RUN npm install -g typescript

CMD [ "npm","start" ]