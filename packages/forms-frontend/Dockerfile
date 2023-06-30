FROM node:18-alpine as BUILD_IMAGE
ENV NODE_ENV production
WORKDIR /app
COPY package*.json ./
# install dependencies
RUN npm install --omit=dev

COPY . .
RUN npx prisma generate
# build
RUN npm run build
FROM node:18-alpine
WORKDIR /app
# copy from build image
COPY --from=BUILD_IMAGE /app/package.json ./package.json
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/public ./public

ENV PORT 8080
EXPOSE 8080
CMD ["yarn", "start"]