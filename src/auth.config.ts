import type { NextAuthConfig } from "next-auth"
import Nodemailer from "next-auth/providers/nodemailer"

export const authConfig = {
  providers: [
    Nodemailer({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
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
