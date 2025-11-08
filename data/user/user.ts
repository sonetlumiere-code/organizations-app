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

export const getUser = async (args?: Prisma.UserFindFirstArgs) => {
  try {
    const user = await prisma.user.findFirst(args)
    return user
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}

export const getUsersAvailableToAdd = async (orgId: string) => {
  try {
    const members = await prisma.member.findMany({
      where: { organizationId: orgId },
      select: { user: { select: { email: true } } },
    })
    const memberEmails = members.map((m) => m.user.email)

    const pendingInvitations = await prisma.invitation.findMany({
      where: {
        organizationId: orgId,
        status: "pending",
      },
      select: { email: true },
    })
    const pendingEmails = pendingInvitations.map((i) => i.email)

    const excludedEmails = Array.from(
      new Set([...memberEmails, ...pendingEmails])
    )

    const users = await prisma.user.findMany({
      where: { email: { notIn: excludedEmails } },
    })

    return users
  } catch (error) {
    console.error("Error fetching users available to invite:", error)
    return []
  }
}
