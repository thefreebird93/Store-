/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    localeDetection: false,
  },
}

module.exports = nextConfig
