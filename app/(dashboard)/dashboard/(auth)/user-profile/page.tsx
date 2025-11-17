import { DashboardContainer } from "@/components/dashboard/layout/dashboard-container"
import ProfileDetailsForm from "@/components/dashboard/profile/profile-details-form"
import { verifyUser } from "@/lib/auth/verify-user"

const UserProfilePage = async () => {
  const session = await verifyUser()

  return (
    <DashboardContainer breadcrumbs={[{ label: "User Profile" }]}>
      <div className="max-w-1/3">
        <ProfileDetailsForm user={session.user} />
      </div>
    </DashboardContainer>
  )
}

export default UserProfilePage
