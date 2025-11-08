"use client"

import { useConfirmation } from "@/components/confirmation-provider"
import { authClient } from "@/lib/auth/auth-client"
import { Invitation } from "@prisma/client"
import { useRouter } from "next/navigation"
import { ReactElement } from "react"
import { toast } from "sonner"

type AcceptInvitationProps = {
  invitation: Invitation
  children: ReactElement<{ onClick?: () => void }>
}

const AcceptInvitation = ({ invitation, children }: AcceptInvitationProps) => {
  const router = useRouter()
  const confirm = useConfirmation()

  const onAccept = async () => {
    confirm({
      title: "Accept invitation?",
    }).then(async () => {
      const { data, error } = await authClient.organization.acceptInvitation({
        invitationId: invitation.id,
      })

      if (error) {
        toast.error("Error accepting invitation. Try again later.")
      }

      if (data) {
        toast.success("Invitation accepted successfully.")
        router.refresh()
      }
    })
  }

  return <span onClick={onAccept}>{children}</span>
}

export default AcceptInvitation
