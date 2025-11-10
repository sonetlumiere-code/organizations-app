"use client"

import { addMember } from "@/actions/auth/members/members"
import { useConfirmation } from "@/components/confirmation-provider"
import { User } from "@/lib/auth/auth"
import { authClient } from "@/lib/auth/auth-client"
import { Role } from "@/types/types"
import { useRouter } from "next/navigation"
import { ReactElement } from "react"
import { toast } from "sonner"

type AddMemberProps = {
  user: User
  children: ReactElement<{ onClick?: () => void }>
}

export const AddMember = ({ user, children }: AddMemberProps) => {
  const router = useRouter()
  const confirm = useConfirmation()
  const { data: activeOrganization } = authClient.useActiveOrganization()
  const roles: Role[] = ["member"]

  const handleAdd = async () => {
    if (!activeOrganization) {
      toast.error("No active organization found.")
      return
    }

    const confirmed = await confirm({
      title: `Add ${user.name} to ${activeOrganization.name}?`,
      description: `This user will be added with the role: ${roles.join(
        " & "
      )}.`,
    })

    if (!confirmed) return

    const { error } = await addMember({
      userId: user.id,
      organizationId: activeOrganization.id,
      roles,
    })

    if (error) {
      toast.error("Error adding member. Please try again later.")
      return
    }

    toast.success("User added successfully.")
    router.push("/dashboard/members")
  }

  return <span onClick={handleAdd}>{children}</span>
}
