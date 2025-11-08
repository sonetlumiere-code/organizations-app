"use client"

import { useConfirmation } from "@/components/confirmation-provider"
import { authClient } from "@/lib/auth/auth-client"
import { Invitation } from "@prisma/client"
import { useRouter } from "next/navigation"
import { ReactElement } from "react"
import { toast } from "sonner"

type RejectInvitationProps = {
  invitation: Invitation
  children: ReactElement<{ onClick?: () => void }>
}

const RejectInvitation = ({ invitation, children }: RejectInvitationProps) => {
  const router = useRouter()
  const confirm = useConfirmation()

  const onReject = async () => {
    confirm({
      variant: "destructive",
      title: "Reject invitation?",
    }).then(async () => {
      const { data, error } = await authClient.organization.rejectInvitation({
        invitationId: invitation.id,
      })

      if (error) {
        toast.error("Error rejecting invitation. Try again later.")
      }

      if (data) {
        toast.success("Invitation rejected successfully.")
        router.refresh()
      }
    })
  }

  return <span onClick={onReject}>{children}</span>
}

export default RejectInvitation
