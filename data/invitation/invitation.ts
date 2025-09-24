import "server-only"

import prisma from "@/lib/db"
import { Prisma } from "@prisma/client"

export const getInvitations = async (args?: Prisma.InvitationFindManyArgs) => {
  try {
    const invitations = await prisma.invitation.findMany(args)
    return invitations
  } catch (error) {
    console.error("Error fetching invitations:", error)
    return null
  }
}
export const getUsersAvailableToInvite = async (orgId: string) => {
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

export const createInvitation = async (data: Prisma.InvitationCreateInput) => {
  try {
    const invitation = await prisma.invitation.create({ data })
    return invitation
  } catch (error) {
    console.error("Error creating invitation:", error)
    return null
  }
}

export const deleteInvitation = async (id: string) => {
  try {
    await prisma.invitation.delete({ where: { id } })
    return true
  } catch (error) {
    console.error("Error deleting invitation:", error)
    return false
  }
}
