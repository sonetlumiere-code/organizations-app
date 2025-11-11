import { z } from "zod"

export const passwordSchema = z
  .string()
  .min(1, "Password is required")
  .min(8, "Password must be at least 8 characters long.")
  .max(128, "Password must be at most 128 characters long")

export type PasswordSchema = z.infer<typeof passwordSchema>
