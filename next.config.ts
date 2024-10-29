import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  reactStrictMode: true,
  assetPrefix: "/colorchess/",
  basePath: "/colorchess",
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
