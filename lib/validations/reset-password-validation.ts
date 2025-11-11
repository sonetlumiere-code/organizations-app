import { z } from "zod"
import { passwordSchema } from "./password-validation"

export const resetPasswordSchema = z.object({
  password: passwordSchema,
})

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
