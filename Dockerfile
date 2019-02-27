FROM node:10-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN npm install
COPY --chown=node:node . .
EXPOSE 8082
CMD [ "node", "app.js" ]