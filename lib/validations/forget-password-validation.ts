import { z } from "zod"

export const forgetPasswordSchema = z.object({
  email: z.email({
    message: "Email is required.",
  }),
})

export type ForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>
