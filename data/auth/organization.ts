import "server-only"

import prisma from "@/lib/db"
import { PopulatedOrganization } from "@/types/types"
import { Prisma } from "@prisma/client"

export const getOrganizations = async (
  args?: Prisma.OrganizationFindManyArgs
) => {
  try {
    const organizations = await prisma.organization.findMany(args)
    return organizations as PopulatedOrganization[]
  } catch (error) {
    console.error("Error fetching organizations:", error)
    return null
  }
}

export const getOrganization = async (
  args: Prisma.OrganizationFindFirstArgs
) => {
  try {
    const organization = await prisma.organization.findFirst(args)

    return organization as PopulatedOrganization | null
  } catch (error) {
    console.error("Error fetching organization:", error)
    return null
  }
}

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
