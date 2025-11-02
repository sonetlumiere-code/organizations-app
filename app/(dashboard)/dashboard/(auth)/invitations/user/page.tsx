import { DashboardContainer } from "@/components/dashboard/layout/dashboard-container"

const UserInvitationsPage = () => {
  return (
    <DashboardContainer
      breadcrumbs={[
        { label: "Invitations", href: "/dashboard/invitations" },
        { label: "User Invitations" },
      ]}
    >
      <div>UserInvitationsPage</div>
    </DashboardContainer>
  )
}

export default UserInvitationsPage
