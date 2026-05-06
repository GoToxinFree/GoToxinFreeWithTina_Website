import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Nodemailer from "next-auth/providers/nodemailer"
import { prisma } from "./lib/prisma"
import { authConfig } from "./auth.config"
import { createTransport } from "nodemailer"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  providers: [
    Nodemailer({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      maxAge: 10 * 60, // 10 minutes in seconds
      async sendVerificationRequest(params) {
        const { identifier, url, provider } = params
        const { host } = new URL(url)
        const transport = createTransport(provider.server)
        
        const result = await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: `Sign in to ${host}`,
          text: `Sign in to ${host}\n${url}\n\nThis link will expire in 10 minutes.`,
          html: `
            <div style="background: #f9fafb; padding: 40px 20px; font-family: sans-serif;">
              <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <div style="background: #004e64; padding: 30px; text-align: center;">
                  <h1 style="color: white; margin: 0; font-size: 24px;">Go Toxin Free Admin</h1>
                </div>
                <div style="padding: 40px; text-align: center;">
                  <h2 style="color: #1e293b; margin-top: 0;">Login Security Link</h2>
                  <p style="color: #64748b; font-size: 16px; line-height: 24px; margin-bottom: 30px;">
                    Click the button below to sign in to your admin dashboard. 
                    For your security, this link is only valid for <strong>10 minutes</strong>.
                  </p>
                  <a href="${url}" style="background: #00a6ce; color: white; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 16px;">
                    Sign in to Dashboard
                  </a>
                  <p style="color: #94a3b8; font-size: 13px; margin-top: 30px;">
                    If you did not request this email, you can safely ignore it.
                  </p>
                </div>
                <div style="background: #f1f5f9; padding: 20px; text-align: center; color: #94a3b8; font-size: 12px;">
                  &copy; ${new Date().getFullYear()} Go Toxin Free With Tina
                </div>
              </div>
            </div>
          `,
        })
        const failed = result.rejected.concat(result.pending).filter(Boolean)
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
        }
      },
    }),
  ],
})

