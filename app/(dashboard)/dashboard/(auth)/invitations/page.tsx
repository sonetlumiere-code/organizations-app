import CancelInvitation from "@/components/dashboard/invitations/cancel-invitation"
import { DashboardContainer } from "@/components/dashboard/layout/dashboard-container"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { auth } from "@/lib/auth/auth"
import { verifyUser } from "@/lib/auth/verify-user"
import { format } from "date-fns"
import { headers } from "next/headers"

const OrganizationInvitationsPage = async () => {
  const session = await verifyUser()
  const orgId = session.session.activeOrganizationId

  const invitations = await auth.api.listInvitations({
    headers: await headers(),
    query: {
      organizationId: orgId,
    },
  })

  console.log({ invitations })

  let canCancel = { success: false }
  if (orgId && invitations.some((inv) => inv.organizationId === orgId)) {
    canCancel = await auth.api.hasPermission({
      headers: await headers(),
      body: { permissions: { invitation: ["cancel"] } },
    })
  }

  return (
    <DashboardContainer
      breadcrumbs={[
        { label: "Invitations", href: "/dashboard/invitations" },
        { label: "All Invitations" },
      ]}
    >
      {invitations.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expiration</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invitations.map((invitation) => {
              return (
                <TableRow key={invitation.id}>
                  <TableCell>{invitation.email}</TableCell>
                  <TableCell>{invitation.role}</TableCell>
                  <TableCell>{invitation.status}</TableCell>
                  <TableCell>
                    {invitation.expiresAt
                      ? format(new Date(invitation.expiresAt), "dd/MM/yyyy")
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    {invitation.status === "pending" && canCancel.success && (
                      <CancelInvitation invitation={invitation}>
                        <Button size="sm" variant="outline">
                          <p className="text-destructive">Cancel</p>
                        </Button>
                      </CancelInvitation>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      ) : (
        <Card>
          <CardContent className="py-20">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="tracking-tight">No invitations to display</h3>
            </div>
          </CardContent>
        </Card>
      )}
    </DashboardContainer>
  )
}

export default OrganizationInvitationsPage
