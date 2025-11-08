import InvitationsTable from "@/components/dashboard/invitations/invitations-table"
import { DashboardContainer } from "@/components/dashboard/layout/dashboard-container"
import { auth } from "@/lib/auth/auth"
import { verifyUser } from "@/lib/auth/verify-user"
import { headers } from "next/headers"

const OrganizationInvitationsPage = async () => {
  const session = await verifyUser()
  const orgId = session.session.activeOrganizationId

  const data = await auth.api.listInvitations({
    headers: await headers(),
    query: {
      organizationId: orgId,
    },
  })

  console.log({ data })

  return (
    <DashboardContainer
      breadcrumbs={[
        { label: "Invitations", href: "/dashboard/invitations" },
        { label: "All Invitations" },
      ]}
    >
      <InvitationsTable invitations={data} />
    </DashboardContainer>
  )
}

export default OrganizationInvitationsPage
