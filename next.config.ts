import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isGithubPages ? "/tccglobaldecor" : undefined,
  assetPrefix: isGithubPages ? "/tccglobaldecor/" : undefined,
};

export default nextConfig;