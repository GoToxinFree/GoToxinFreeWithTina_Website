import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Hostinger Node.js deployment — generates .nft.json trace files
  output: "standalone",

  // Prevent Prisma (and other Node.js-only packages) from being bundled into
  // the Edge Runtime by keeping them as external server-only packages
  serverExternalPackages: ["@prisma/client"],

  // OPTIMIZATION FOR HOSTINGER:
  // Limits the number of worker threads to prevent "pthread_create" errors
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  experimental: {
    workerThreads: false,
    cpus: 1
  }
};

export default nextConfig;
