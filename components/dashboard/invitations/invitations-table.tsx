import { Button } from "@/components/ui/button"
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
import { Invitation } from "@prisma/client"
import { format } from "date-fns"
import { headers } from "next/headers"
import AcceptInvitation from "./accept-invitation"
import CancelInvitation from "./cancel-invitation"
import RejectInvitation from "./reject-invitation"

const InvitationsTable = async ({
  invitations,
}: {
  invitations: Invitation[]
}) => {
  const session = await verifyUser()
  const activeOrgId = session?.session?.activeOrganizationId
  const userEmail = session?.user?.email

  let canCancel = { success: false }
  if (
    activeOrgId &&
    invitations.some((inv) => inv.organizationId === activeOrgId)
  ) {
    canCancel = await auth.api.hasPermission({
      headers: await headers(),
      body: { permissions: { invitation: ["cancel"] } },
    })
  }

  return (
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
          const isInvitee = invitation.email === userEmail
          const isSameOrg = invitation.organizationId === activeOrgId

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
                {invitation.status === "pending" &&
                  (isInvitee ? (
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
                  ) : (
                    isSameOrg &&
                    canCancel.success && (
                      <CancelInvitation invitation={invitation}>
                        <Button size="sm" variant="outline">
                          <p className="text-destructive">Cancel</p>
                        </Button>
                      </CancelInvitation>
                    )
                  ))}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default InvitationsTable
