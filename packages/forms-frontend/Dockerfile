FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV npm_config_cache /home/node/app/.npm

COPY package*.json ./
RUN npm install --production --frozen-lockfile

FROM node:18-alpine AS builder
WORKDIR /app
ENV npm_config_cache /home/node/app/.npm
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1
ENV npm_config_cache /home/node/app/.npm

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 8080

ENV PORT 8080

CMD ["npm", "start"]
