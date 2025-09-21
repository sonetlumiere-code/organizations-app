import { DashboardContainer } from "@/components/dashboard/layout/dashboard-container"
import CreateOrganizationForm from "@/components/organizations/create-organization-form"
import { Card, CardContent } from "@/components/ui/card"

const CreateOrganizationPage = () => {
  return (
    <DashboardContainer
      breadcrumbs={[
        { label: "Organizations", href: "/organizations" },
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
