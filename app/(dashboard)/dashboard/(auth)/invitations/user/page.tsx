import InvitationsTable from "@/components/dashboard/invitations/invitations-table"
import { DashboardContainer } from "@/components/dashboard/layout/dashboard-container"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"

const UserInvitationsPage = async () => {
  const data = await auth.api.listUserInvitations({
    headers: await headers(),
  })

  console.log({ data })

  return (
    <DashboardContainer
      breadcrumbs={[
        { label: "Invitations", href: "/dashboard/invitations" },
        { label: "User Invitations" },
      ]}
    >
      <InvitationsTable invitations={data} />
    </DashboardContainer>
  )
}

export default UserInvitationsPage
