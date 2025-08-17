import { auth } from "@/lib/auth"
import prisma from "@/lib/db"
import { headers } from "next/headers"

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
      memberships: {
        where: { userId: session.user.id },
        include: { role: true },
      },
    },
  })

  if (!organization) {
    return <div>Organization not found.</div>
  }

  if (organization.memberships.length === 0) {
    return <div>You do not have access to this organization.</div>
  }

  return (
    <div>
      <h1>{organization.name} Dashboard</h1>
      <pre>{JSON.stringify({ session, organization }, null, 2)}</pre>
    </div>
  )
}
