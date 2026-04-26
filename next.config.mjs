/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Strip console.* in production builds (except errors). Reduces bundle
  // size and prevents accidental info leaks via dev logs.
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
  // Image optimization not needed for this project (no <Image> usage),
  // but leaving the default optimizer enabled in case it grows.
};

export default nextConfig;
