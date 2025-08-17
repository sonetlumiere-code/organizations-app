/* eslint-disable @next/next/no-img-element */

import SignUpForm from "@/components/auth/signup-form"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LANDING_ROUTE, SIGN_IN_ROUTE } from "@/routes"
import { Metadata } from "next"
import Link from "next/link"

const appName = process.env.APP_NAME

export const metadata: Metadata = {
  title: `Create Organization - ${appName}`,
  description: "Create your organization.",
}

export default async function SignUpPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href={SIGN_IN_ROUTE}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Sign In
      </Link>
      <div className="relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex">
        <div className='absolute inset-0 bg-[url("/img/gradient.jpeg")] bg-cover bg-center bg-no-repeat' />
        <div className="relative z-20 flex items-center">
          <Link href={LANDING_ROUTE} className="block">
            <span className="sr-only">HOME</span>
            <img
              src="/img/better-auth.png"
              alt={appName}
              className="max-w-36 mx-auto py-4"
            />
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <footer className="text-sm">{appName}</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create your organization
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email address below to create your account.
            </p>
          </div>
          <div className="px-4">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  )
}
