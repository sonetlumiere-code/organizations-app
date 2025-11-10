import { ac, admin, member, owner } from "@/lib/auth/permissions"
import {
  inferAdditionalFields,
  organizationClient,
} from "better-auth/client/plugins"
import { nextCookies } from "better-auth/next-js"
import { createAuthClient } from "better-auth/react"
import { auth } from "./auth"

export const authClient = createAuthClient({
  baseURL: process.env.BASE_URL,
  plugins: [
    organizationClient({
      ac,
      roles: { owner, admin, member },
    }),
    inferAdditionalFields<typeof auth>(),
    nextCookies(),
  ],
})
