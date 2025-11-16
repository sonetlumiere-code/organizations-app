"use client"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth/auth-client"
import { DASHBOARD_ROUTE } from "@/routes"
import { Dispatch, SetStateAction } from "react"
import { toast } from "sonner"

type GoogleAuthProps = {
  isSubmitting: boolean
  isGoogleLoading: boolean
  setIsGoogleLoading: Dispatch<SetStateAction<boolean>>
  redirectTo?: string
}

const GoogleAuth = ({
  isSubmitting,
  isGoogleLoading,
  setIsGoogleLoading,
  redirectTo,
}: GoogleAuthProps) => {
  const signInWithGoogle = async () => {
    setIsGoogleLoading(true)

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectTo || DASHBOARD_ROUTE,
    })

    if (error) {
      console.error(error)
      toast.error(error.message || "Google authentication failed.")
    }
  }

  return (
    <Button
      variant="outline"
      type="button"
      disabled={isGoogleLoading || isSubmitting}
      onClick={signInWithGoogle}
    >
      {isGoogleLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.google />
      )}
      Google
    </Button>
  )
}

export default GoogleAuth
