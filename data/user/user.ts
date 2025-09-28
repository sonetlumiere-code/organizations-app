import "server-only"

import prisma from "@/lib/db"
import { Prisma } from "@prisma/client"

export const getUsers = async (args?: Prisma.UserFindManyArgs) => {
  try {
    const users = await prisma.user.findMany(args)
    return users
  } catch (error) {
    console.error("Error fetching users:", error)
    return null
  }
}

export const getUsersAvailableToAdd = async (orgId: string) => {
  try {
    const invitedUsers = await prisma.invitation.findMany({
      where: { organizationId: orgId },
      select: { email: true },
    })
    const members = await prisma.member.findMany({
      where: { organizationId: orgId },
      select: { user: { select: { email: true } } },
    })
    const excludedEmails = [
      ...invitedUsers.map((inv) => inv.email),
      ...members.map((mem) => mem.user.email),
    ]
    const users = await prisma.user.findMany({
      where: { email: { notIn: excludedEmails } },
    })
    return users
  } catch (error) {
    console.error("Error fetching users available to invite:", error)
    return null
  }
}
