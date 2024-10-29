/** @type {import('next').NextConfig} */

const nextConfig = {
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
