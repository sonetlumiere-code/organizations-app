import { getMembers } from "@/data/member/member"
import "server-only"

export async function checkIsOnboarded(userId: string): Promise<boolean> {
  const members = await getMembers({
    where: {
      userId,
    },
    include: { organization: true },
  })

  if (!members?.length) {
    return false
  }

  const isOwner = members?.some((member) => member.role === "owner")

  return isOwner
}
