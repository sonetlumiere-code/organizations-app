"use client"

import OrganizationAvatar from "@/components/organization-avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { authClient } from "@/lib/auth/auth-client"
import { Organization } from "better-auth/plugins"
import { ChevronsUpDown, Plus } from "lucide-react"
import { toast } from "sonner"

export function OrganizationSwitcher() {
  const { isMobile } = useSidebar()

  const { data: organizations } = authClient.useListOrganizations()

  console.log(organizations)

  const { data: activeOrganization } = authClient.useActiveOrganization()

  const handleChangeOrganization = async (org: Organization) => {
    console.log(org)
    const { error } = await authClient.organization.setActive({
      organizationId: org.id,
    })

    if (error) {
      toast.error("Failed to switch organization")
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {activeOrganization ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <OrganizationAvatar
                  orgName={activeOrganization.name}
                  orgSlug={activeOrganization.slug}
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {activeOrganization.name}
                  </span>
                  <span className="truncate text-xs">
                    {activeOrganization.slug}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-muted-foreground text-xs">
                Organizations
              </DropdownMenuLabel>
              {organizations &&
                organizations.map((org, index) => (
                  <DropdownMenuItem
                    key={org.id}
                    onClick={() => handleChangeOrganization(org)}
                    className="gap-2 p-2"
                  >
                    <OrganizationAvatar orgName={org.name} orgSlug={org.slug} />
                    {org.name}
                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                  </DropdownMenuItem>
                ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <Plus className="size-4" />
                </div>
                <div className="text-muted-foreground font-medium">
                  Add Organization
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Skeleton className="w-full h-12 border" />
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
