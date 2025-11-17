import { DashboardContainer } from "@/components/dashboard/layout/dashboard-container"
import ProfileDetailsForm from "@/components/dashboard/profile/profile-details-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { verifyUser } from "@/lib/auth/verify-user"

const UserProfilePage = async () => {
  const session = await verifyUser()

  return (
    <DashboardContainer breadcrumbs={[{ label: "User Profile" }]}>
      <div className="max-w-1/3">
        <Card>
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription>Update profile</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileDetailsForm user={session.user} />
          </CardContent>
        </Card>
      </div>
    </DashboardContainer>
  )
}

export default UserProfilePage
