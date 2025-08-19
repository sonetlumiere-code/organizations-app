import "server-only"

import prisma from "@/lib/db"

export const getActiveOrganization = async (userId: string) => {
  const memberUser = await prisma.member.findFirst({
    where: { userId },
  })

  if (!memberUser) return null

  const activeOrganization = await prisma.organization.findFirst({
    where: {
      id: memberUser.organizationId,
    },
  })

  return activeOrganization
}
