"use client"

import { useConfirmation } from "@/components/confirmation-provider"
import { Icons } from "@/components/icons"
import { authClient } from "@/lib/auth/auth-client"
import { PopulatedOrganization } from "@/types/types"
import { toast } from "sonner"

type DeleteOrganizationProps = {
  organization: PopulatedOrganization
}

const DeleteOrganization = ({ organization }: DeleteOrganizationProps) => {
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
      }
    })
  }

  return (
    <span onClick={onDelete} className="flex">
      <Icons.trash2 className="w-4 h-4 text-destructive" />
      <p className="ml-2 text-destructive">Delete</p>
    </span>
  )
}

export default DeleteOrganization
