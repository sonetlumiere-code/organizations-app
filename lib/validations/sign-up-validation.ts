import z from "zod"
import { passwordSchema } from "./password-validation"

export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  password: passwordSchema,
})

export type SignupSchema = z.infer<typeof signupSchema>
