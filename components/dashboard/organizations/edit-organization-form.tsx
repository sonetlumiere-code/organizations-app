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
import { Organization } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const EditOrganizationForm = ({
  organization,
}: {
  organization: Organization
}) => {
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(organizationSchema),
    defaultValues: organization,
  })

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (values: OrganizationSchema) => {
    try {
      const { data, error } = await authClient.organization.update({
        organizationId: organization.id,
        data: values,
      })

      console.log(data, error)

      if (error) {
        toast.error(error.message)
      } else {
        toast.success("Organization edited successfully")
        router.replace(DASHBOARD_ROUTE)
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to edit organization")
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
            <>Edit organization</>
          )}
        </Button>
      </form>
    </Form>
  )
}

export default EditOrganizationForm
