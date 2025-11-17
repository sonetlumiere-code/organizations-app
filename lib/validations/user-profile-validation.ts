import z from "zod"

export const userProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.string().nullable(),
})

export type UserProfileSchema = z.infer<typeof userProfileSchema>
