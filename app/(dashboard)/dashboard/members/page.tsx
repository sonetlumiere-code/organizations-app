import { DashboardContainer } from "@/components/dashboard/layout/dashboard-container"
import MembersTable from "@/components/dashboard/members/members-table"
import { auth } from "@/lib/auth/auth"
import { verifyUser } from "@/lib/auth/verify-user"
import { PopulatedMember } from "@/types/types"
import { headers } from "next/headers"

const MembersPage = async () => {
  const session = await verifyUser()
  const orgId = session.session.activeOrganizationId

  const { members } = await auth.api.listMembers({
    headers: await headers(),
    query: {
      organizationId: orgId,
      sortBy: "createdAt",
      // limit: 100,
      // offset: 0,
    },
  })

  console.log({ members })

  return (
    <DashboardContainer
      breadcrumbs={[
        { label: "Members", href: "/dashboard/members" },
        { label: "Members list" },
      ]}
    >
      <MembersTable members={members as PopulatedMember[]} />
    </DashboardContainer>
  )
}

export default MembersPage
