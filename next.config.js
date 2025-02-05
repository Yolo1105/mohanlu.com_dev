/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  reactStrictMode: true,
  images: {
    loader: 'akamai', // Or another supported loader like 'imgix' or 'cloudinary'
    path: '', // Ensure a custom path or empty string for sta
    unoptimized: true, // Disable optimization for static builds
  },
  assetPrefix: './', // Required for GitHub Pages
  trailingSlash: true, // Ensures proper routing
};
