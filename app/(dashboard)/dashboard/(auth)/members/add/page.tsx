import { DashboardContainer } from "@/components/dashboard/layout/dashboard-container"
import { AddMember } from "@/components/dashboard/members/add-member"
import { InviteMember } from "@/components/dashboard/members/invite-member"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { auth } from "@/lib/auth/auth"
import { verifyUser } from "@/lib/auth/verify-user"
import { format } from "date-fns"
import { headers } from "next/headers"

const AddMemberPage = async () => {
  const session = await verifyUser()

  const users = await getUsersAvailableToAdd(
    session.session.activeOrganizationId!
  )

  const canInvite = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        invitation: ["create"],
      },
    },
  })

  const canAddMember = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        member: ["create"],
      },
    },
  })

  return (
    <DashboardContainer
      breadcrumbs={[
        { label: "Members", href: "/dashboard/members/add" },
        { label: "Add member" },
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
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <Icons.moreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Show menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>

                      {canAddMember.success && (
                        <AddMember user={user}>
                          <DropdownMenuItem>
                            <Icons.plus className="w-4 h-4" />
                            <p>Add</p>
                          </DropdownMenuItem>
                        </AddMember>
                      )}

                      {canInvite.success && (
                        <InviteMember user={user}>
                          <DropdownMenuItem>
                            <Icons.send className="w-4 h-4" />
                            <p>Invite</p>
                          </DropdownMenuItem>
                        </InviteMember>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </DashboardContainer>
  )
}

export default AddMemberPage
