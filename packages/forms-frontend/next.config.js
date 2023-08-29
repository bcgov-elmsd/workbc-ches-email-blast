/** @type {import('next').NextConfig} */
const { PrismaPlugin } = require("@prisma/nextjs-monorepo-workaround-plugin")
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.plugins = [...config.plugins, new PrismaPlugin()]
        }

        return config
    },
    experimental: {
        appDir: true
    },
    output: "standalone"
}

module.exports = nextConfig
