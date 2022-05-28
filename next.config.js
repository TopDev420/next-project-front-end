/** @type {import('next').NextConfig} */
module.exports = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  reactStrictMode: false,
  images: {
    domains: [
      'res.cloudinary.com',
      'maps.googleapis.com',
      'localhost',
      'vacation.rentals',
      'api.vacation.rentals',
      'staging.vacation.rentals',
      'api.staging.vacation.rentals',
    ],
  },
  async redirects() {
    return [
      {
        source: '/my-page/property/:id',
        destination: '/my-page/property/:id/basics',
        permanent: true,
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
