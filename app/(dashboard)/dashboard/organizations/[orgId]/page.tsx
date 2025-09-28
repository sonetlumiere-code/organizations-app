import { DashboardContainer } from "@/components/dashboard/layout/dashboard-container"
import MembersTable from "@/components/dashboard/members/members-table"
import { getOrganization } from "@/data/auth/organization"
import { auth } from "@/lib/auth/auth"
import { verifyUser } from "@/lib/auth/verify-user"
import { DASHBOARD_ROUTE } from "@/routes"
import { PopulatedMember } from "@/types/types"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

const OrganizationPage = async ({
  params,
}: {
  params: Promise<{ orgId: string }>
}) => {
  await verifyUser()

  const { orgId } = await params

  const organization = await getOrganization({
    where: { id: orgId },
    include: { members: { include: { user: true } } },
  })

  console.log({ organization })

  if (!organization) {
    return redirect(DASHBOARD_ROUTE)
  }

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
    <DashboardContainer>
      <h1>{organization.name}</h1>
      <pre>{JSON.stringify(organization, null, 4)}</pre>

      <h2>Members</h2>
      <MembersTable members={members as PopulatedMember[]} />
    </DashboardContainer>
  )
}

export default OrganizationPage
