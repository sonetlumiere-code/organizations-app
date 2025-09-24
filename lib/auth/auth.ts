import { getActiveOrganization } from "@/data/auth/organization"
import { getSubscription } from "@/data/subscription/subscription"
import { ac, admin, member, owner } from "@/lib/auth/permissions"
import prisma from "@/lib/db"
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { nextCookies } from "better-auth/next-js"
import { organization } from "better-auth/plugins"
import { Resend } from "resend"

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
  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const organization = await getActiveOrganization(session.userId)
          return {
            data: {
              ...session,
              activeOrganizationId: organization?.id || null,
            },
          }
        },
      },
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60,
      },
    },
  },
  plugins: [
    organization({
      ac,
      roles: { owner, admin, member },
      organizationHooks: {
        afterCreateOrganization: async ({ organization, user }) => {
          await resend.emails.send({
            from: process.env.RESEND_EMAIL,
            to: user.email,
            subject: "Organization created",
            html: `New organization created. Organization name: ${organization.name}. Organization slug: ${organization.slug}`,
          })
        },
      },
      allowUserToCreateOrganization: async (user) => {
        const subscription = await getSubscription(user.id)
        return subscription.plan === "pro"
      },
    }),
    nextCookies(),
  ],
})
