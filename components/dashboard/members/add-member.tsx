"use client"

import { addMember } from "@/actions/members/members"
import { useConfirmation } from "@/components/confirmation-provider"
import { authClient } from "@/lib/auth/auth-client"
import { Role } from "@/types/types"
import { User } from "@prisma/client"
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

  const onAdd = async () => {
    confirm({
      title: `Add ${user.name} to ${activeOrganization.name} organization?`,
      description: `User will be added as role ${roles.join(" & ")}`,
    }).then(async () => {
      const { data, error } = await addMember({
        userId: user.id,
        organizationId: activeOrganization.id,
        roles,
      })

      if (error) {
        toast.error("Error adding member. Try again later.")
      }

      if (data) {
        toast.success("User added successfully.")
        router.push("/dashboard/members")
      }
    })
  }

  return <span onClick={onAdd}>{children}</span>
}
