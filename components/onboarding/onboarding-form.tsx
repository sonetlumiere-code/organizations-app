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
  organizationSchema,
  OrganizationSchema,
} from "@/lib/validations/organization-validation"
import { DASHBOARD_ROUTE } from "@/routes"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const OnboardingForm = () => {
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "",
      slug: "",
      logo: "",
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (values: OrganizationSchema) => {
    try {
      const { data, error } = await authClient.organization.create({
        ...values,
        keepCurrentActiveOrganization: false,
      })

      console.log(data, error)

      if (error) {
        toast.error(error.message)
      } else {
        toast.success("Organization created successfully")
        // router.replace(`${DASHBOARD_ROUTE}/${data.id}`)
        router.replace(DASHBOARD_ROUTE)
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to create organization")
    }
  }

  return (
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
                    placeholder="Organization name"
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
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Organization slug"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Icons.spinner className="w-4 h-4 animate-spin" />
          ) : (
            <>Create organization</>
          )}
        </Button>
      </form>
    </Form>
  )
}

export default OnboardingForm
