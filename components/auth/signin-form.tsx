"use client"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth/auth-client"
import {
  SigninSchema,
  signinSchema,
} from "@/lib/validations/sign-in-validation"
import { DASHBOARD_ROUTE, FORGET_PASSWORD_ROUTE } from "@/routes"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import FormError from "./form-error"
import GoogleAuth from "./google-auth"

export default function SignInForm() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const form = useForm<SigninSchema>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (data: SigninSchema) => {
    setErrorMessage(null)

    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: DASHBOARD_ROUTE,
      },
      {
        onRequest: () => {},
        onSuccess: () => {
          router.push(DASHBOARD_ROUTE)
        },
        onError: (ctx) => {
          setErrorMessage(ctx.error.message)
        },
      }
    )
  }

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <div className="space-y-3">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@example.com"
                      disabled={isSubmitting || isGoogleLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Your password"
                        type={showPassword ? "text" : "password"}
                        autoCapitalize="none"
                        autoComplete="on"
                        disabled={isSubmitting || isGoogleLoading}
                        {...field}
                      />
                      <span className="absolute inset-y-0 end-1">
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="hover:bg-transparent"
                          disabled={isSubmitting || isGoogleLoading}
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          <span className="sr-only"></span>
                          {showPassword ? (
                            <Icons.eyeOff className="h-5 w-5" />
                          ) : (
                            <Icons.eye className="h-5 w-5" />
                          )}
                        </Button>
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                  <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="px-0 font-normal"
                    disabled={isSubmitting || isGoogleLoading}
                  >
                    <Link href={FORGET_PASSWORD_ROUTE}>
                      Forgot your password?
                    </Link>
                  </Button>
                </FormItem>
              )}
            />
          </div>

          <FormError message={errorMessage} />

          <Button type="submit" disabled={isSubmitting || isGoogleLoading}>
            {isSubmitting ? (
              <Icons.spinner className="w-4 h-4 animate-spin" />
            ) : (
              <>Sign In</>
            )}
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <GoogleAuth
        isSubmitting={isSubmitting}
        isGoogleLoading={isGoogleLoading}
        setIsGoogleLoading={setIsGoogleLoading}
      />
    </div>
  )
}
