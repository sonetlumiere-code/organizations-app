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
