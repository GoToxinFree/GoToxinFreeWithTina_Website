import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Nodemailer from "next-auth/providers/nodemailer"
import { prisma } from "./lib/prisma"
import { authConfig } from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  providers: [
    Nodemailer({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
})

