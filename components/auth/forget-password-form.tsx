"use client"

import FormError from "@/components/auth/form-error"
import FormSuccess from "@/components/auth/form-success"
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
  ForgetPasswordSchema,
  forgetPasswordSchema,
} from "@/lib/validations/forget-password-validation"
import { RESET_PASSWORD_ROUTE, SIGN_IN_ROUTE } from "@/routes"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"

const ForgetPasswordForm = () => {
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const form = useForm<ForgetPasswordSchema>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  async function onSubmit(values: ForgetPasswordSchema) {
    setError("")
    setSuccess("")

    const { data, error } = await authClient.forgetPassword({
      email: values.email,
      redirectTo: RESET_PASSWORD_ROUTE,
    })

    console.log(data)

    if (error) {
      setError(error.message)
    } else {
      setSuccess("Email sent. Please check your inbox.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" disabled={isSubmitting} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormError message={error} />
        <FormSuccess message={success} />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Icons.spinner className="w-4 h-4 animate-spin" />
          ) : (
            <>Send Email</>
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

export default ForgetPasswordForm
