import ActiveOrganization from "@/components/dashboard/analytics/active-organization"
import { DashboardContainer } from "@/components/dashboard/layout/dashboard-container"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    return <div>You must be signed in to view this page.</div>
  }

  return (
    <DashboardContainer
      breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]}
    >
      <h1>Dashboard</h1>

      <ActiveOrganization />
    </DashboardContainer>
  )
}
