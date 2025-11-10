import { Icons } from "@/components/icons"
import SignOutButton from "@/components/sign-out-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserAvatar from "@/components/user-avatar"
import { Session } from "@/lib/auth/auth"
import { DASHBOARD_ROUTE, ONBOARDING_ROUTE } from "@/routes"
import Link from "next/link"

type AdminDropdownProps = {
  session: Session
}

const AdminProfileDropdown = async ({ session }: AdminDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={session.user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          {session.session.activeOrganizationId ? (
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
