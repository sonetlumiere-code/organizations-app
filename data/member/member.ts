import prisma from "@/lib/db"
import { PopulatedMember } from "@/types/types"
import { Prisma } from "@prisma/client"
import "server-only"

export const getMembers = async (args?: Prisma.MemberFindManyArgs) => {
  try {
    const members = await prisma.member.findMany(args)
    return members as PopulatedMember[] | null
  } catch (error) {
    console.error("Error fetching members:", error)
    return null
  }
}

export const getMember = async (args?: Prisma.MemberFindFirstArgs) => {
  try {
    const member = await prisma.member.findFirst(args)
    return member as PopulatedMember | null
  } catch (error) {
    console.error("Error fetching member:", error)
    return null
  }
}
