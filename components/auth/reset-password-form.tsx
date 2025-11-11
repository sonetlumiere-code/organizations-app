"use client"

import FormError from "@/components/auth/form-error"
import { Icons } from "@/components/icons"
import { Button, buttonVariants } from "@/components/ui/button"
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
import { cn } from "@/lib/utils"
import {
  ResetPasswordSchema,
  resetPasswordSchema,
} from "@/lib/validations/reset-password-validation"
import { SIGN_IN_ROUTE } from "@/routes"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string>("")

  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const router = useRouter()

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  async function onSubmit(values: ResetPasswordSchema) {
    setError("")

    const { error } = await authClient.resetPassword({
      newPassword: values.password,
      token,
    })

    if (error) {
      setError(error.message)
    } else {
      toast.success("Password changed successfully. You can now sign in.")
      router.replace(SIGN_IN_ROUTE)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="password"
                    type={showPassword ? "text" : "password"}
                    autoCapitalize="none"
                    autoComplete="on"
                    disabled={isSubmitting}
                    {...field}
                  />
                  <span className="absolute inset-y-0 end-1">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="hover:bg-transparent"
                      disabled={isSubmitting}
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
            </FormItem>
          )}
        />

        <FormError message={error} />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Icons.spinner className="w-4 h-4 animate-spin" />
          ) : (
            <>Change password</>
          )}
        </Button>

        <Link
          href={SIGN_IN_ROUTE}
          className={cn(buttonVariants({ variant: "ghost" }), "")}
        >
          Sign In
        </Link>
      </form>
    </Form>
  )
}

export default ResetPasswordForm
