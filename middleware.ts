import NextAuth from "next-auth"
import { authConfig } from "@/auth.config"

// Use the edge-compatible config (no PrismaAdapter) for middleware
export const { auth: middleware } = NextAuth(authConfig)

export const config = {
  matcher: [
    // Protect all /admin pages
    '/admin/:path*',
    // Protect all /api/admin routes
    '/api/admin/:path*',
  ],
}
