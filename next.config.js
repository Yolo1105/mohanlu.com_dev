/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Needed for GitHub Pages
  },
  assetPrefix: isProd ? '/mohanlu.com_dev/' : '', // Set asset prefix for GitHub Pages
  trailingSlash: true, // Ensures all paths have a trailing slash (important for static exports)
  output: 'export', // Required to generate static files
};
