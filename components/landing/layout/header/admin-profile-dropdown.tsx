import { Icons } from "@/components/icons"
import SignOutButton from "@/components/sign-out-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserAvatar from "@/components/user-avatar"
import { DASHBOARD_ROUTE, ONBOARDING_ROUTE } from "@/routes"
import { Session, User } from "better-auth/*"
import Link from "next/link"

type AdminDropdownProps = {
  user: User
  session: Session & { activeOrganizationId?: string | null }
}

const AdminProfileDropdown = async ({ user, session }: AdminDropdownProps) => {
  console.log(user, session)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          {session.activeOrganizationId ? (
            <>
              <Icons.layoutDashboard className="w-4 h-4 mr-1" />
              <Link href={DASHBOARD_ROUTE}>Dashboard</Link>
            </>
          ) : (
            <>
              <Icons.rocket className="w-4 h-4 mr-1" />
              <Link href={ONBOARDING_ROUTE}>Onboarding</Link>
            </>
          )}
        </DropdownMenuItem>

        <SignOutButton>
          <DropdownMenuItem>
            <Icons.logOut className="w-4 h-4 mr-1" /> Sign Out
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AdminProfileDropdown
