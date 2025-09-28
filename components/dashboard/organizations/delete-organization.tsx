"use client"

import { useConfirmation } from "@/components/confirmation-provider"
import { authClient } from "@/lib/auth/auth-client"
import { PopulatedOrganization } from "@/types/types"
import { useRouter } from "next/navigation"
import { cloneElement, ReactElement } from "react"
import { toast } from "sonner"

type DeleteOrganizationProps = {
  organization: PopulatedOrganization
  children: ReactElement<{ onClick?: () => void }>
}

const DeleteOrganization = ({
  organization,
  children,
}: DeleteOrganizationProps) => {
  const router = useRouter()
  const confirm = useConfirmation()

  const onDelete = async () => {
    confirm({
      variant: "destructive",
      title: `Delete organization ${organization.name}?`,
      description: "This action is irreversible.",
    }).then(async () => {
      const { data, error } = await authClient.organization.delete({
        organizationId: organization.id,
      })

      if (error) {
        toast.error("Error deleting organization. Try again later.")
      }

      if (data) {
        toast.success(`Organization ${data.name} deleted successfully.`)
        router.refresh()
      }
    })
  }

  return cloneElement(children, {
    onClick: onDelete,
  })
}

export default DeleteOrganization
