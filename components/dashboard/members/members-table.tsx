import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import UserAvatar from "@/components/user-avatar"
import { PopulatedMember } from "@/types/types"
import { User } from "@prisma/client"
import { format } from "date-fns"

const MembersTable = ({ members }: { members: PopulatedMember[] }) => {
  return (
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
  )
}

export default MembersTable
