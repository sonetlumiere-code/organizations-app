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
import UserAvatar from "@/components/user-avatar"
import { User } from "@/lib/auth/auth"
import { authClient } from "@/lib/auth/auth-client"
import {
  userProfileSchema,
  UserProfileSchema,
} from "@/lib/validations/user-profile-validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { XIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const ProfileDetailsForm = ({ user }: { user: User }) => {
  console.log(user)

  const form = useForm<UserProfileSchema>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: user.name,
      image: user.image ?? null,
    },
  })

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
    reset,
  } = form

  const router = useRouter()

  async function onSubmit({ name, image }: UserProfileSchema) {
    const { error } = await authClient.updateUser({ name, image })

    if (error) {
      toast.error(error.message || "Error updating user profile.")
      console.error(error)
    } else {
      toast("User profile updated succesfully.")
      reset()
      router.refresh()
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        setValue("image", base64, { shouldDirty: true })
      }
      reader.readAsDataURL(file)
    }
  }

  const imagePreview = watch("image")
  user.image = imagePreview || user.image

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Full name"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>Profile image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e)}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {imagePreview && (
            <div className="relative size-16">
              <UserAvatar user={user} size={"sm"} />
              <Button
                type="button"
                variant="ghost"
                className="absolute -top-2 -right-2 size-6 rounded-full"
                onClick={() => setValue("image", null)}
                aria-label="Remove image"
                disabled={isSubmitting}
              >
                <XIcon className="size-4" />
              </Button>
            </div>
          )}
        </div>

        <Button type="submit" className="min-w-36" disabled={isSubmitting}>
          {isSubmitting ? (
            <Icons.spinner className="h-4 w-4 animate-spin" />
          ) : (
            "Save changes"
          )}
        </Button>
      </form>
    </Form>
  )
}

export default ProfileDetailsForm
