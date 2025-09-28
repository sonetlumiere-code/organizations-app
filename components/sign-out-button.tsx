"use client"

import { authClient } from "@/lib/auth/auth-client"
import { useRouter } from "next/navigation"
import { ReactElement, cloneElement } from "react"

interface SignOutButtonProps {
  children: ReactElement<{ onClick?: () => void }>
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

  return cloneElement(children, {
    onClick: signOut,
  })
}

export default SignOutButton
