/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
    domains: [],
    formats: ['image/webp'],
  },
  optimizeFonts: true,
};

module.exports = nextConfig;
