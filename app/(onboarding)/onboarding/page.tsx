/* eslint-disable @next/next/no-img-element */

import { Icons } from "@/components/icons"
import OnboardingForm from "@/components/onboarding/on-boarding-form"
import { buttonVariants } from "@/components/ui/button"
import { auth } from "@/lib/auth/auth"
import { checkIsOnboarded } from "@/lib/check-is-onboarded"
import { cn } from "@/lib/utils"
import { LANDING_ROUTE } from "@/routes"
import { Metadata } from "next"
import { headers } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"

const appName = process.env.APP_NAME

export const metadata: Metadata = {
  title: `Create organization - ${appName}`,
  description: "Create organization.",
}

const OnBoardingPage = async () => {
  const reqHeaders = await headers()
  const session = await auth.api.getSession({
    headers: reqHeaders,
  })

  if (!session) {
    redirect(LANDING_ROUTE)
  }

  const isOnboarded = await checkIsOnboarded(session.user.id)

  if (isOnboarded) {
    await auth.api.signOut({
      headers: reqHeaders,
    })
    // if user is already onboarded, force a sign out to clear session
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href={LANDING_ROUTE}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Link href={LANDING_ROUTE} className="block">
            <span className="sr-only">HOME</span>
            <img
              src="/img/better-auth.png"
              alt={appName}
              className="max-w-36 mx-auto py-4"
            />
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">
            Create your organization
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your organization name and slug
          </p>
        </div>
        <div className="px-4">
          <OnboardingForm />
        </div>
      </div>
    </div>
  )
}

export default OnBoardingPage
