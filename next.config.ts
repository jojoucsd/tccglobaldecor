// next.config.ts
import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // These two lines are the key for GitHub Pages project sites:
  basePath: isGithubPages ? "/tccglobaldecor" : undefined,
  assetPrefix: isGithubPages ? "/tccglobaldecor/" : undefined,
};

export default nextConfig;
