import { DashboardContainer } from "@/components/dashboard/layout/dashboard-container"
import { verifyUser } from "@/lib/auth/verify-user"

const DashboardPage = async () => {
  await verifyUser()

  return (
    <DashboardContainer breadcrumbs={[{ label: "Dashboard" }]}>
      DashboardPage
    </DashboardContainer>
  )
}

export default DashboardPage
