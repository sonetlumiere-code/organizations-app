"use client"

import { authClient } from "@/lib/auth/auth-client"
import { useRouter } from "next/navigation"
import { ReactElement } from "react"
import { toast } from "sonner"

interface SignOutButtonProps {
  children: ReactElement<{ onClick?: () => void }>
}

const SignOutButton = ({ children }: SignOutButtonProps) => {
  const router = useRouter()

  const signOut = async () => {
    const { error } = await authClient.signOut()

    if (error) {
      toast.error(error.message || "Something went wrong.")
    } else {
      router.refresh()
    }
  }

  return <span onClick={signOut}>{children}</span>
}

export default SignOutButton
