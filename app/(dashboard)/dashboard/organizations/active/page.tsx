import ActiveOrganization from "@/components/dashboard/analytics/active-organization"
import { DashboardContainer } from "@/components/dashboard/layout/dashboard-container"
import { verifyUser } from "@/lib/auth/verify-user"

const ActiveOrganizationPage = async () => {
  await verifyUser()

  return (
    <DashboardContainer
      breadcrumbs={[
        { label: "Organizations", href: "/dashboard/organizations" },
        {
          label: "Active Organization",
        },
      ]}
    >
      <ActiveOrganization />
    </DashboardContainer>
  )
}

export default ActiveOrganizationPage
