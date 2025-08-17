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
import { authClient } from "@/lib/auth-client"
import {
  SignupFormData,
  signupSchema,
} from "@/lib/validations/sign-up-validation"
import { CHECK_EMAIL_ROUTE, ONBOARDING_ROUTE } from "@/routes"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import FormError from "./form-error"

const SignUpForm = () => {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (data: SignupFormData) => {
    setErrorMessage(null)

    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
        callbackURL: ONBOARDING_ROUTE,
      },
      {
        onRequest: () => {},
        onSuccess: () => {
          router.push(`${CHECK_EMAIL_ROUTE}/?email=${data.email}`)
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@example.com"
                      disabled={isSubmitting}
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
          </div>

          <FormError message={errorMessage} />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Icons.spinner className="w-4 h-4 animate-spin" />
            ) : (
              <>Sign Up</>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default SignUpForm
