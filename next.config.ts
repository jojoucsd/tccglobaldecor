import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // enables static export (replaces next export)
  images: {
    unoptimized: true, // for GitHub Pages (no remote image loader)
  },
  trailingSlash: true, // optional: improves GitHub Pages routing
};

export default nextConfig;
