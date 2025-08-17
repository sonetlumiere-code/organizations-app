import { auth } from "@/lib/auth"
import prisma from "@/lib/db"
import { LANDING_ROUTE } from "@/routes"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

interface DashboardPageProps {
  params: Promise<{ orgId: string }>
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { orgId } = await params

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    return <div>You must be signed in to view this page.</div>
  }

  const organization = await prisma.organization.findUnique({
    where: { id: orgId },
    include: {
      members: true,
    },
  })

  if (!organization) {
    return <div>Organization not found.</div>
  }

  console.log(organization)

  const isMember = organization.members.some(
    (member) => member.userId === session.user.id
  )

  if (!isMember) {
    console.error("User is not member of this organization")
    redirect(LANDING_ROUTE)
  }

  return (
    <div className="">
      <h1>{organization.name} Dashboard</h1>
    </div>
  )
}
