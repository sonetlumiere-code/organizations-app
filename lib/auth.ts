import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { nextCookies } from "better-auth/next-js"
import { Resend } from "resend"
import prisma from "./db"

const resend = new Resend(process.env.RESEND_API_KEY!)

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }) => {
      await resend.emails.send({
        from: "no-reply@yourdomain.com",
        to: user.email,
        subject: "Reset your password",
        html: `Click here to reset your password: <a href="${url}?token=${token}">${url}</a>`,
      })
    },
    resetPasswordTokenExpiresIn: 3600,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }) => {
      await resend.emails.send({
        from: "no-reply@yourdomain.com",
        to: user.email,
        subject: "Verify your email",
        html: `Click here to verify your email: <a href="${url}?token=${token}">${url}</a>`,
      })
    },
    expiresIn: 3600,
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [nextCookies()],
})
