import z from "zod"
import { passwordSchema } from "./password-validation"

export const signinSchema = z.object({
  email: z.email("Invalid email address"),
  password: passwordSchema,
})

export type SigninSchema = z.infer<typeof signinSchema>
