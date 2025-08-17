import z from "zod"

export const organizationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters long")
    .max(16, "Slug must be at most 16 characters long"),
  logo: z.string().optional(),
})

export type OrganizationSchema = z.infer<typeof organizationSchema>
