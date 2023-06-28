FROM node:lts-alpine3.16
ENV NODE_ENV production

WORKDIR /cron

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

RUN npm i --omit=dev

COPY . ./

RUN npm run build

CMD [ "node", "dist/app.js" ]
