import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Hostinger Node.js deployment — generates .nft.json trace files
  output: "standalone",

  // Prevent Prisma (and other Node.js-only packages) from being bundled into
  // the Edge Runtime by keeping them as external server-only packages
  serverExternalPackages: ["@prisma/client", "bcrypt"],
};

export default nextConfig;
