/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

const withNextIntl = require('next-intl/plugin')();

module.exports = withNextIntl(nextConfig);
