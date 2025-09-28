import { DashboardContainer } from "@/components/dashboard/layout/dashboard-container"
import { getMember } from "@/data/member/member"
import { verifyUser } from "@/lib/auth/verify-user"

const MemberPage = async ({
  params,
}: {
  params: Promise<{ memberId: string }>
}) => {
  await verifyUser()

  const { memberId } = await params

  const member = await getMember({
    where: { id: memberId },
    include: { user: true, organization: true },
  })

  return (
    <DashboardContainer
      breadcrumbs={[
        { label: "Members", href: "/dashboard/members" },
        { label: "Member details" },
      ]}
    >
      <h1>Member: {member?.user?.email}</h1>
      <pre>{JSON.stringify(member, null, 4)}</pre>
    </DashboardContainer>
  )
}

export default MemberPage
