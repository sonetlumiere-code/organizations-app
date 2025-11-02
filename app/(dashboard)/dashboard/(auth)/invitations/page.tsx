import { DashboardContainer } from "@/components/dashboard/layout/dashboard-container"

const AllInvitationsPage = () => {
  return (
    <DashboardContainer
      breadcrumbs={[
        { label: "Invitations", href: "/dashboard/invitations" },
        { label: "All Invitations" },
      ]}
    >
      <div>All InvitationsPage</div>
    </DashboardContainer>
  )
}

export default AllInvitationsPage
