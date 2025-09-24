import { LANDING_ROUTE, ONBOARDING_ROUTE } from "@/routes"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "./auth"

export const verifyUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return redirect(LANDING_ROUTE)
  }

  if (session.session.activeOrganizationId === null) {
    return redirect(ONBOARDING_ROUTE)
  }

  return session
}
