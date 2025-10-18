// next.config.js
const isPages = process.env.GITHUB_PAGES === "true";
const repoBase = "/tccglobaldecor";

/** @type {import('next').NextConfig} */
module.exports = {
  output: isPages ? "export" : undefined,
  basePath: isPages ? repoBase : "",
  images: { unoptimized: isPages },
  eslint: { ignoreDuringBuilds: true },
  env: { NEXT_PUBLIC_BASE_PATH: isPages ? repoBase : "" }, // optional if you don't manually use it
};
