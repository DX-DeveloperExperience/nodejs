FROM node:carbon

ENV PORT 8080

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY app ./app

EXPOSE 8080

CMD [ "npm", "start" ]