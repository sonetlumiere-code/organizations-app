import AcceptInvitation from "@/components/dashboard/invitations/accept-invitation"
import RejectInvitation from "@/components/dashboard/invitations/reject-invitation"
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
import { format } from "date-fns"
import { headers } from "next/headers"

const UserInvitationsPage = async () => {
  const invitations = await auth.api.listUserInvitations({
    headers: await headers(),
  })

  console.log({ invitations })

  return (
    <DashboardContainer
      breadcrumbs={[
        { label: "Invitations", href: "/dashboard/invitations" },
        { label: "User Invitations" },
      ]}
    >
      {invitations?.length > 0 ? (
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
                    {invitation.status === "pending" && (
                      <div className="flex justify-end gap-2">
                        <AcceptInvitation invitation={invitation}>
                          <Button size="sm" variant="default">
                            Accept
                          </Button>
                        </AcceptInvitation>
                        <RejectInvitation invitation={invitation}>
                          <Button size="sm" variant="outline">
                            Reject
                          </Button>
                        </RejectInvitation>
                      </div>
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
              <h3 className="tracking-tight">No invitations received</h3>
            </div>
          </CardContent>
        </Card>
      )}
    </DashboardContainer>
  )
}

export default UserInvitationsPage
