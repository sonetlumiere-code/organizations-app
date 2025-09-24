import { DashboardContainer } from "@/components/dashboard/layout/dashboard-container"
import EditOrganizationForm from "@/components/organizations/edit-organization-form"
import { Card, CardContent } from "@/components/ui/card"
import { getOrganization } from "@/data/auth/organization"
import { verifyUser } from "@/lib/auth/verify-user"
import { DASHBOARD_ROUTE } from "@/routes"
import { redirect } from "next/navigation"

const EditOrganizationPage = async ({
  params,
}: {
  params: Promise<{ orgId: string }>
}) => {
  await verifyUser()

  const { orgId } = await params
  const organization = await getOrganization({ where: { id: orgId } })

  if (!organization) {
    return redirect(DASHBOARD_ROUTE)
  }

  return (
    <DashboardContainer
      breadcrumbs={[
        { label: "Organizations", href: "/dashboard/organizations" },
        { label: "Edit organization" },
      ]}
    >
      <h1>Edit Organization</h1>

      <div className="md:w-1/2">
        <Card>
          <CardContent>
            <EditOrganizationForm organization={organization} />
          </CardContent>
        </Card>
      </div>
    </DashboardContainer>
  )
}

export default EditOrganizationPage
