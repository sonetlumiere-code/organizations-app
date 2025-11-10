import { LANDING_ROUTE, ONBOARDING_ROUTE } from "@/routes"
import { redirect } from "next/navigation"
import { getCachedSession } from "./cached-session"

export const verifyUser = async () => {
  const session = await getCachedSession()

  if (!session) {
    return redirect(LANDING_ROUTE)
  }

  if (session.session.activeOrganizationId === null) {
    return redirect(ONBOARDING_ROUTE)
  }

  return session
}
