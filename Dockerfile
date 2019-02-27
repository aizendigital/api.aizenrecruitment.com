FROM node:8.14.0-alpine

WORKDIR /aizen

COPY package.json .

RUN yarn

COPY . .

CMD node app.js
