"use client"

import { useConfirmation } from "@/components/confirmation-provider"
import { authClient } from "@/lib/auth/auth-client"
import { Role } from "@/types/types"
import { User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { ReactElement } from "react"
import { toast } from "sonner"

type InviteMemberProps = {
  user: User
  children: ReactElement<{ onClick?: () => void }>
}

export const InviteMember = ({ user, children }: InviteMemberProps) => {
  const router = useRouter()
  const confirm = useConfirmation()
  const { data: activeOrganization } = authClient.useActiveOrganization()
  const roles: Role[] = ["member"]

  const handleInvite = async () => {
    if (!activeOrganization) {
      toast.error("No active organization found.")
      return
    }

    const confirmed = await confirm({
      title: `Invite ${user.name} to ${activeOrganization.name}?`,
      description: `An email will be sent to add them as ${roles.join(" & ")}.`,
    })

    if (!confirmed) return

    const { error } = await authClient.organization.inviteMember({
      email: user.email,
      role: roles,
      organizationId: activeOrganization.id,
      resend: true,
    })

    if (error) {
      // console.log(error)
      toast.error(error.message)
      return
    }

    toast.success("Invitation sent successfully.")
    router.push("/dashboard/invitations")
  }

  return <span onClick={handleInvite}>{children}</span>
}
