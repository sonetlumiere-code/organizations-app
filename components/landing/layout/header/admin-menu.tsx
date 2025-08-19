import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { auth } from "@/lib/auth/auth"
import { cn } from "@/lib/utils"
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "@/routes"
import { headers } from "next/headers"
import Link from "next/link"
import { Suspense } from "react"
import AdminProfileDropdown from "./admin-profile-dropdown"

const AdminMenu = async () => {
  const session = await auth.api.getSession({ headers: await headers() })

  return (
    <Suspense fallback={<Skeleton className="rounded-full w-10 h-10" />}>
      <>
        {session?.user ? (
          <AdminProfileDropdown user={session.user} />
        ) : (
          <div className="flex gap-3">
            <Link
              href={SIGN_IN_ROUTE}
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              Sign In
            </Link>

            <Link
              href={SIGN_UP_ROUTE}
              className={cn(buttonVariants({ variant: "default" }), "")}
            >
              Sign Up
            </Link>
          </div>
        )}
      </>
    </Suspense>
  )
}

export default AdminMenu
