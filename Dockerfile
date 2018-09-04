FROM node:10-alpine

ENV PORT 8080

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY app ./app

USER node

EXPOSE 8080

CMD [ "npm", "start" ]