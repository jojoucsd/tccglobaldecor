// next.config.js
const isPages = process.env.GITHUB_PAGES === "true";
const repoBase = "/tccglobaldecor";

module.exports = {
  output: isPages ? "export" : undefined,
  basePath: isPages ? repoBase : "",
  assetPrefix: isPages ? `${repoBase}/` : undefined,
  images: { unoptimized: isPages },
  eslint: { ignoreDuringBuilds: true },
  env: { NEXT_PUBLIC_BASE_PATH: isPages ? repoBase : "" },
};



