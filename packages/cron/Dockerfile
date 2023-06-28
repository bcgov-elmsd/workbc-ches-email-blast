FROM node:16-alpine

WORKDIR /cron

COPY package.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

RUN npm i --omit=dev

COPY . ./

RUN npm run build

CMD [ "node", "dist/app.js" ]
