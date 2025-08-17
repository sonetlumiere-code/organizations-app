"use client"

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"

interface SignOutButtonProps {
  children?: ReactNode
}

const SignOutButton = ({ children }: SignOutButtonProps) => {
  const router = useRouter()

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh()
        },
      },
    })
  }
  return <span onClick={signOut}>{children}</span>
}

export default SignOutButton
