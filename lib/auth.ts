import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { nextCookies } from "better-auth/next-js"
import { Resend } from "resend"
import prisma from "./db"

const resend = new Resend(process.env.RESEND_API_KEY)

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: process.env.RESEND_EMAIL,
        to: user.email,
        subject: "Reset your password",
        html: `Click here to reset your password: <a href="${url}">${url}</a>`,
      })
    },
    resetPasswordTokenExpiresIn: 3600,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: process.env.RESEND_EMAIL,
        to: user.email,
        subject: "Verify your email",
        html: `Click here to verify your email: <a href="${url}">${url}</a>`,
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
  // callbacks: {
  //   async session({ session, user }) {
  //     const memberships = await prisma.membership.findMany({
  //       where: { userId: user.id },
  //       include: {
  //         organization: { select: { id: true, name: true, slug: true } },
  //         role: {
  //           select: {
  //             id: true,
  //             name: true,
  //             description: true,
  //             permissions: true,
  //           },
  //         },
  //       },
  //     })

  //     session.user = {
  //       ...user,
  //       memberships: memberships.map((m) => ({
  //         organization: m.organization,
  //         isAdmin: m.isAdmin,
  //         role: m.role || undefined,
  //       })),
  //     } as AuthUser
  //   },
  // },
  plugins: [nextCookies()],
})
