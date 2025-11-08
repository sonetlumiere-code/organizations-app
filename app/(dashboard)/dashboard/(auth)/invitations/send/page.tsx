import { DashboardContainer } from "@/components/dashboard/layout/dashboard-container"
import { InviteMember } from "@/components/dashboard/members/invite-member"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import UserAvatar from "@/components/user-avatar"
import { getUsersAvailableToAdd } from "@/data/user/user"
import { verifyUser } from "@/lib/auth/verify-user"
import { format } from "date-fns"

const SendInvitationPage = async () => {
  const session = await verifyUser()

  const users = await getUsersAvailableToAdd(
    session.session.activeOrganizationId!
  )

  return (
    <DashboardContainer
      breadcrumbs={[
        { label: "Invitations", href: "/dashboard/invitations" },
        { label: "Send Invitation" },
      ]}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead className="hidden md:md:table-cell">
              Email Verified
            </TableHead>
            <TableHead className="hidden md:md:table-cell">Joined at</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>
                <div className="py-6 text-center text-sm text-muted-foreground">
                  No users to invite found.
                </div>
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <UserAvatar user={user} size="sm" />

                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>

                      <span className="text-xs text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell>{user.emailVerified ? "true" : "false"}</TableCell>

                <TableCell className="hidden md:table-cell">
                  {format(user.createdAt, "dd/MM/yyyy")}
                </TableCell>

                <TableCell className="text-right">
                  <InviteMember user={user}>
                    <Button>
                      <Icons.send className="w-4 h-4" />
                      Invite
                    </Button>
                  </InviteMember>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </DashboardContainer>
  )
}

export default SendInvitationPage
