FROM node:lts-alpine3.16 AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
USER 0
WORKDIR /app
ENV NODE_ENV=production
# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* ../../package-lock.json* package-lock.json* pnpm-lock.yaml* ./


# Rebuild the source code only when needed
FROM base AS builder
USER 0
WORKDIR /app

ENV NODE_ENV=production
# COPY --from=deps node_modules node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN npm i --omit=dev
RUN npx prisma generate
RUN npm run build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
USER 0
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=1001:1001 /app/.next/standalone ./
COPY --from=builder --chown=1001:1001 /app/.next/static ./.next/static

USER 1001

EXPOSE 8080

ENV PORT 8080

CMD ["node", "server.js"]
