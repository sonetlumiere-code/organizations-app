import { DashboardContainer } from "@/components/dashboard/layout/dashboard-container"
import CreateOrganizationForm from "@/components/dashboard/organizations/create-organization-form"
import { Card, CardContent } from "@/components/ui/card"
import { verifyUser } from "@/lib/auth/verify-user"

const CreateOrganizationPage = async () => {
  await verifyUser()

  return (
    <DashboardContainer
      breadcrumbs={[
        { label: "Organizations", href: "/dashboard/organizations" },
        { label: "Create organization" },
      ]}
    >
      <h1>Create Organization</h1>

      <div className="md:w-1/2">
        <Card>
          <CardContent>
            <CreateOrganizationForm />
          </CardContent>
        </Card>
      </div>
    </DashboardContainer>
  )
}

export default CreateOrganizationPage
