const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  images: {
    domains: ['www.themealdb.com', 'i.nefisyemektarifleri.com'],
  },
};

module.exports = withNextIntl(nextConfig);
