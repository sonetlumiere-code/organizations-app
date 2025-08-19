import { Icons } from "@/components/icons"
import SignOutButton from "@/components/sign-out-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserAvatar from "@/components/user-avatar"
import { DASHBOARD_ROUTE } from "@/routes"
import { User } from "better-auth/*"
import Link from "next/link"

type AdminDropdownProps = {
  user: User
}

const AdminProfileDropdown = async ({ user }: AdminDropdownProps) => {
  // const userMemberships = await prisma.member.findMany({
  //   where: { userId: user.id },
  //   select: {
  //     organization: { select: { id: true, name: true } },
  //   },
  // })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* {userMemberships.map((m) => (
          <DropdownMenuItem key={m.organization.id}>
            <Link href={`${DASHBOARD_ROUTE}/${m.organization.id}`}>
              {m.organization.name} Dashboard
            </Link>
          </DropdownMenuItem>
        ))} */}
        <DropdownMenuItem>
          <Link href={DASHBOARD_ROUTE}>Dashboard</Link>
        </DropdownMenuItem>

        <SignOutButton>
          <DropdownMenuItem>
            <Icons.logOut className="w-4 h-4 mr-2" /> Sign Out
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AdminProfileDropdown
