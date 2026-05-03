import type { NextAuthConfig } from "next-auth"

// IMPORTANT: This file must remain edge-compatible.
// Do NOT import Nodemailer, Prisma, or any Node.js-only modules here.
// Providers are added in auth.ts which runs in the Node.js runtime only.
export const authConfig = {
  providers: [], // Providers are added in auth.ts
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdminApi = nextUrl.pathname.startsWith('/api/admin');
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');

      if (isOnAdminApi) {
        // Return false for API routes — NextAuth will respond with 401 JSON automatically
        return isLoggedIn;
      }
      if (isOnAdmin) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      return true;
    },
    async signIn({ user }) {
      const adminEmail = process.env.ADMIN_EMAIL || "drtinapramanik@gmail.com";
      // Only allow the whitelisted admin email to log in
      if (user.email?.toLowerCase() === adminEmail.toLowerCase()) {
        return true;
      }
      return false; 
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
} satisfies NextAuthConfig
