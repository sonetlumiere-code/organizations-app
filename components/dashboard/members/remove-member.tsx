"use client"

import { useConfirmation } from "@/components/confirmation-provider"
import { authClient } from "@/lib/auth/auth-client"
import { PopulatedMember } from "@/types/types"
import { useRouter } from "next/navigation"
import { ReactElement } from "react"
import { toast } from "sonner"

type RemoveMemberProps = {
  member: PopulatedMember
  children: ReactElement<{ onClick?: () => void }>
}

const RemoveMember = ({ member, children }: RemoveMemberProps) => {
  const router = useRouter()
  const confirm = useConfirmation()
  const { data: activeOrganization } = authClient.useActiveOrganization()

  const onRemove = async () => {
    confirm({
      variant: "destructive",
      title: `Remove ${member.user.name} from ${activeOrganization.name} organization?`,
      description: "This action is irreversible.",
    }).then(async () => {
      const { data, error } = await authClient.organization.removeMember({
        memberIdOrEmail: member.id,
        organizationId: activeOrganization.id,
      })

      if (error) {
        toast.error("Error removing member. Try again later.")
      }

      if (data) {
        toast.success("User removed successfully.")
        router.refresh()
      }
    })
  }

  return <span onClick={onRemove}>{children}</span>
}

export default RemoveMember
