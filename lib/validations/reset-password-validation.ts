import { z } from "zod"

export const resetPasswordSchema = z.object({
  email: z.email({
    message: "Email is required.",
  }),
})

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
