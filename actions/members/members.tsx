"use server"

import { auth } from "@/lib/auth/auth"
import { Role } from "@/types/types"

export const addMember = async ({
  userId,
  organizationId,
  roles,
  teamId,
}: {
  userId?: string
  organizationId?: string
  roles: Role[]
  teamId?: string
}) => {
  const data = await auth.api.addMember({
    body: {
      userId,
      role: roles,
      organizationId,
      teamId,
    },
  })
  return data
}

export const removeMember = async ({
  memberIdOrEmail,
  organizationId,
}: {
  memberIdOrEmail: string
  organizationId: string
}) => {
  const data = await auth.api.removeMember({
    body: {
      memberIdOrEmail,
      organizationId,
    },
  })
  return data
}
