import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Hostinger Node.js deployment — generates .nft.json trace files
  output: "standalone",

  // Prevent Prisma (and other Node.js-only packages) from being bundled into
  // the Edge Runtime by keeping them as external server-only packages
  serverExternalPackages: ["@prisma/client", "bcrypt"],

  // OPTIMIZATION FOR HOSTINGER:
  // Limits the number of worker threads to prevent "pthread_create" errors
  experimental: {
    cpus: 1,
    workerThreads: false,
  },

  // Disable image optimization because it spawns multiple processes per image,
  // which triggers the "pthread_create" limit on Hostinger shared hosting.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
