import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    domains: ["cdn.sanity.io"], // This ensures Sanity's image domain is whitelisted
  },
  typescript: {
    ignoreBuildErrors: true, // Not recommended for production; consider fixing errors instead
  },
};

export default nextConfig;
