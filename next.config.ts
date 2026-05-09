import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Hostinger Node.js deployment — generates .nft.json trace files
  output: "standalone",

  // Prevent Prisma (and other Node.js-only packages) from being bundled into
  // the Edge Runtime by keeping them as external server-only packages
  serverExternalPackages: ["@prisma/client", "bcrypt"],

  // OPTIMIZATION FOR HOSTINGER:
  // Limits the number of worker threads to prevent "pthread_create" errors
  // which happen when the hosting account hits its process/thread limit.
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
};

export default nextConfig;
