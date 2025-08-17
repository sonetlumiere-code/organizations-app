"use client"

import { Icons } from "@/components/icons"
import SignOutButton from "@/components/sign-out-button"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { LANDING_ROUTE, SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "@/routes"
import Link from "next/link"
import { useState } from "react"

const SheetLandingHeader = () => {
  const [open, setOpen] = useState(false)

  const { data: session, isPending } = authClient.useSession()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="cursor-pointer">
        <Icons.menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <Link
            href={LANDING_ROUTE}
            className="block"
            onClick={() => setOpen(false)}
          >
            <SheetTitle className="sr-only">Home</SheetTitle>
            <span className="text-2xl font-bold text-gray-900">
              {process.env.APP_NAME}
            </span>
          </Link>
        </SheetHeader>

        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <Separator />

          {isPending ? (
            <Skeleton className="w-full h-10" />
          ) : (
            <div className="space-y-3">
              {session?.user ? (
                <SignOutButton>
                  <Button className="w-full">
                    <Icons.logOut className="w-4 h-4 mr-2" /> Sign Out
                  </Button>
                </SignOutButton>
              ) : (
                <>
                  <Link
                    href={SIGN_UP_ROUTE}
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "w-full"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <Link
                    href={SIGN_IN_ROUTE}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "w-full"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default SheetLandingHeader
