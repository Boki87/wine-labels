const withNextIntl = require('next-intl/plugin')();
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
    }
}

module.exports = withNextIntl(nextConfig)
