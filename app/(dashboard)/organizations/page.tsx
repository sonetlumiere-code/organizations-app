import { DashboardContainer } from "@/components/dashboard/layout/dashboard-container"

const OrganizationsPage = () => {
  return (
    <DashboardContainer
      breadcrumbs={[{ label: "Organizations", href: "/organizations" }]}
    >
      Organizations
    </DashboardContainer>
  )
}

export default OrganizationsPage
