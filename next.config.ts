/** @type {import('next').NextConfig} */
const repoBase = "/tccglobaldecor";

module.exports = {
  output: "export",
  basePath: repoBase,
  assetPrefix: `${repoBase}/`,
  images: { unoptimized: true },
};



