import ResetPasswordForm from "@/components/auth/reset-password-form"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LANDING_ROUTE, SIGN_UP_ROUTE } from "@/routes"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"

const ResetPasswordPage = () => {
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
            <Image
              src="/img/better-auth.png"
              alt="Auth logo"
              height={36}
              width={120}
              quality={100}
              className="mx-auto py-4"
            />
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">
            Change password
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your new password
          </p>
        </div>

        <Suspense>
          <ResetPasswordForm />
        </Suspense>

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

export default ResetPasswordPage
