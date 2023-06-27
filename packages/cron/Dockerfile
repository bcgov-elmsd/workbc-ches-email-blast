FROM node:16-alpine

COPY package.json /cron/package.json

WORKDIR /cron

RUN npm install

COPY . /cron

RUN npx tsup src
RUN npx prisma generate

CMD [ "node", "dist/app.js" ]
