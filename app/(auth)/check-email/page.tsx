/* eslint-disable @next/next/no-img-element */
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import prisma from "@/lib/db"
import { cn } from "@/lib/utils"
import { LANDING_ROUTE, SIGN_UP_ROUTE } from "@/routes"
import Link from "next/link"
import { redirect } from "next/navigation"

const appName = process.env.APP_NAME

type CheckEmailProps = {
  searchParams: Promise<{ email: string }>
}

const CheckEmail = async ({ searchParams }: CheckEmailProps) => {
  const { email } = await searchParams

  if (!email) redirect(LANDING_ROUTE)

  const dbEmail = await prisma.user.findFirst({
    where: {
      email,
      emailVerified: false,
    },
  })

  if (!dbEmail) redirect(LANDING_ROUTE)

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
            Verify your email
          </h1>
          <p className="text-sm text-muted-foreground">Email sent to {email}</p>
        </div>

        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href={SIGN_UP_ROUTE}
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account yet? Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default CheckEmail
