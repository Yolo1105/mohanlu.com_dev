/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  reactStrictMode: true,
  images: {
    loader: 'custom', // Use a custom loader
    unoptimized: true, // Disable optimization for static builds
  },
  assetPrefix: './', // Required for GitHub Pages
  trailingSlash: true, // Ensures proper routing
};
