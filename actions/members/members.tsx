"use server"

import { auth } from "@/lib/auth/auth"
import { ActionResponse, Role } from "@/types/types"

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
}): Promise<ActionResponse> => {
  try {
    const data = await auth.api.addMember({
      body: {
        userId,
        role: roles,
        organizationId,
        teamId,
      },
    })

    return { success: true, data }
  } catch (err) {
    console.error("addMember failed", err)
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unexpected error",
    }
  }
}
