import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGIN
    ? [process.env.ALLOWED_DEV_ORIGIN]
    : undefined,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  transpilePackages: ["@repo/sanity-schema"],
};

export default nextConfig;
