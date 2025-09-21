import { DashboardContainer } from "@/components/dashboard/layout/dashboard-container"
import OnboardingForm from "@/components/onboarding/onboarding-form"

const CreateOrganizationPage = () => {
  return (
    <DashboardContainer
      breadcrumbs={[
        { label: "Organizations", href: "/organizations" },
        { label: "Create organization" },
      ]}
    >
      <h1>Create Organization</h1>

      <div className="w-1/2">
        <OnboardingForm />
      </div>
    </DashboardContainer>
  )
}

export default CreateOrganizationPage
