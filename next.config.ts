/** @type {import('next').NextConfig} */
const isPages = true; // set via env in CI if you prefer
const basePath = "/tccglobaldecor";

module.exports = {
  output: "export",                 // important for GitHub Pages
  basePath,                         // /<repo>
  assetPrefix: `${basePath}/`,      // ensure _next assets resolve
  images: {
    unoptimized: true,              // no optimizer on Pages
  },
};

