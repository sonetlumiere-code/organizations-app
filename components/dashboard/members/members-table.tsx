import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
import { auth } from "@/lib/auth/auth"
import { PopulatedMember } from "@/types/types"
import { User } from "@prisma/client"
import { format } from "date-fns"
import { headers } from "next/headers"
import Link from "next/link"
import RemoveMember from "./remove-member"

const MembersTable = async ({ members }: { members: PopulatedMember[] }) => {
  const canDelete = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        member: ["delete"],
      },
    },
  })

  return members.length > 0 ? (
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

                  <Link href={`/dashboard/members/${member.id}`}>
                    <DropdownMenuItem>
                      <Icons.eye className="h-4 w-4" />
                      View
                    </DropdownMenuItem>
                  </Link>

                  {canDelete.success && (
                    <RemoveMember member={member}>
                      <DropdownMenuItem>
                        <Icons.trash2 className="w-4 h-4 text-destructive" />
                        <p className="text-destructive">Remove</p>
                      </DropdownMenuItem>
                    </RemoveMember>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <Card>
      <CardContent className="py-20">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="tracking-tight">No members to display</h3>
        </div>
      </CardContent>
    </Card>
  )
}

export default MembersTable
