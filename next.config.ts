/** @type {import('next').NextConfig} */
const isPages = process.env.GITHUB_PAGES === "true";
const repoBase = "/tccglobaldecor";

module.exports = {
  // Only export + prefix when building for GitHub Pages
  output: isPages ? "export" : undefined,
  basePath: isPages ? repoBase : "",
  assetPrefix: isPages ? `${repoBase}/` : undefined,
  images: {
    unoptimized: isPages, // GitHub Pages can't run the optimizer
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isPages ? repoBase : "",
  },
};


