import { Icons } from "@/components/icons"
import SignOutButton from "@/components/sign-out-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserAvatar from "@/components/user-avatar"
import prisma from "@/lib/db"
import { DASHBOARD_ROUTE } from "@/routes"
import { User } from "better-auth/*"
import Link from "next/link"

type AdminDropdownProps = {
  user: User
}

const AdminProfileDropdown = async ({ user }: AdminDropdownProps) => {
  const memberships = await prisma.membership.findMany({
    where: { userId: user.id },
    select: {
      organization: { select: { id: true, name: true } },
      isAdmin: true,
    },
  })

  const adminMemberships = memberships?.filter((m) => m.isAdmin) ?? []

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {adminMemberships.map((m) => (
          <Link
            key={m.organization.id}
            href={`${DASHBOARD_ROUTE}/${m.organization.id}`}
          >
            {m.organization.name} Dashboard
          </Link>
        ))}

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
