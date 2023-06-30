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
RUN npm cache clean --force
FROM node:18-alpine
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# copy from build image
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app ./
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/.next ./.next
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/public ./public

USER nextjs

ENV PORT 8080
EXPOSE 8080
CMD ["npm", "run", "start"]