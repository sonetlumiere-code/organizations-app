import { DashboardSidebar } from "@/components/dashboard/layout/sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { verifyUser } from "@/lib/auth/verify-user"

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  await verifyUser()

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
