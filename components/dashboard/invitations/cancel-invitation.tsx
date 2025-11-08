"use client"

import { useConfirmation } from "@/components/confirmation-provider"
import { authClient } from "@/lib/auth/auth-client"
import { Invitation } from "@prisma/client"
import { useRouter } from "next/navigation"
import { ReactElement } from "react"
import { toast } from "sonner"

type CancelInvitationProps = {
  invitation: Invitation
  children: ReactElement<{ onClick?: () => void }>
}

const CancelInvitation = ({ invitation, children }: CancelInvitationProps) => {
  const router = useRouter()
  const confirm = useConfirmation()

  const onCancel = async () => {
    confirm({
      variant: "destructive",
      title: "Cancel invitation?",
    }).then(async () => {
      const { data, error } = await authClient.organization.cancelInvitation({
        invitationId: invitation.id,
      })

      if (error) {
        toast.error("Error canceling invitation. Try again later.")
      }

      if (data) {
        toast.success("Invitation canceled successfully.")
        router.refresh()
      }
    })
  }

  return <span onClick={onCancel}>{children}</span>
}

export default CancelInvitation
