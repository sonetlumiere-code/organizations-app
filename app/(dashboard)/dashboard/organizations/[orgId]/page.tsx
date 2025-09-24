import { DashboardContainer } from "@/components/dashboard/layout/dashboard-container"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import UserAvatar from "@/components/user-avatar"
import { getOrganization } from "@/data/auth/organization"
import { auth } from "@/lib/auth/auth"
import { verifyUser } from "@/lib/auth/verify-user"
import { DASHBOARD_ROUTE } from "@/routes"
import { User } from "better-auth/*"
import { format } from "date-fns"
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

  if (!members) {
    return redirect(DASHBOARD_ROUTE)
  }

  return (
    <DashboardContainer>
      <h1>{organization.name}</h1>
      <pre>{JSON.stringify(organization, null, 4)}</pre>

      <h2>Members</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <UserAvatar user={member.user as User} size="sm" />
              </TableCell>
              <TableCell>{member.user.name}</TableCell>
              <TableCell>{member.user.email}</TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell>
                {member.createdAt
                  ? format(new Date(member.createdAt), "dd/MM/yyyy")
                  : "-"}
              </TableCell>
              <TableCell className="text-right"> Edit | Delete</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardContainer>
  )
}

export default OrganizationPage
