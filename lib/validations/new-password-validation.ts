import { z } from "zod"

export const newPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(128, "Password must be at most 128 characters long"),
})

export type NewPasswordSchema = z.infer<typeof newPasswordSchema>
