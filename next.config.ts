// next.config.js
/** @type {import('next').NextConfig} */
const isPages = process.env.DEPLOY_TARGET === "github-pages"; // demo
const basePath = isPages ? "/tccglobaldecor" : "";

const nextConfig = {
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    // On GH Pages we must disable optimizer; on AWS we can enable it
    unoptimized: isPages, 
    // If you later store hero images on S3 and serve via CloudFront domain:
    remotePatterns: [
      // Example: allow your CloudFront image domain
      // { protocol: "https", hostname: "dxxxx.cloudfront.net", pathname: "/images/**" }
    ],
  },
};
module.exports = nextConfig;
