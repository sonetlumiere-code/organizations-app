"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  CircleUserRound,
  Gem,
  Group,
  Mail,
  Network,
  Shield,
} from "lucide-react"
import { DashboardNavMain } from "./nav-main"
import { DashboardNavSubjects } from "./nav-projects"
import { DashboardNavUser } from "./nav-user"
import { OrganizationSwitcher } from "./organization-switcher"

const data = {
  navMain: [
    {
      title: "Organizations",
      url: "#",
      icon: Network,
      isActive: true,
      items: [
        {
          title: "List Organizations",
          url: "/dashboard/organizations",
        },
        {
          title: "Active Organization",
          url: "/dashboard/organizations/active",
        },
        {
          title: "Create Organization",
          url: "/dashboard/organizations/create",
        },
      ],
    },
    {
      title: "Invitations",
      url: "#",
      icon: Mail,
      items: [
        {
          title: "List all Invitations",
          url: "/dashboard/invitations",
        },
        {
          title: "Send Invitation",
          url: "/dashboard/invitations/send",
        },
        {
          title: "List user Invitations",
          url: "/dashboard/invitations/user",
        },
      ],
    },
    {
      title: "Members",
      url: "#",
      icon: CircleUserRound,
      items: [
        {
          title: "List Members",
          url: "/dashboard/members",
        },
        {
          title: "Add Member",
          url: "/dashboard/members/add",
        },
        {
          title: "Leave Organization",
          url: "/dashboard/members/leave",
        },
      ],
    },
    {
      title: "Dynamic Access Control",
      url: "#",
      icon: Shield,
      items: [
        {
          title: "List Roles",
          url: "/dashboard/roles",
        },
        {
          title: "Permissions",
          url: "/dashboard/permissions",
        },
        {
          title: "Create Role",
          url: "/dashboard/roles/create",
        },
      ],
    },
    {
      title: "Teams",
      url: "#",
      icon: Group,
      items: [
        {
          title: "List Teams",
          url: "/dashboard/teams",
        },
        {
          title: "Active Team",
          url: "/dashboard/teams/active",
        },
        {
          title: "Create Team",
          url: "/dashboard/teams/create",
        },
        {
          title: "Team Members",
          url: "/dashboard/teams/members",
        },
        {
          title: "Team Permissions",
          url: "/dashboard/teams/permissions",
        },
      ],
    },
    // {
    //   title: "Settings",
    //   url: "",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Teams",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  subjects: [
    {
      name: "Products",
      url: "/dashboard/products",
      icon: Gem,
    },
  ],
}

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <OrganizationSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <DashboardNavMain items={data.navMain} />
        <DashboardNavSubjects subjects={data.subjects} />
      </SidebarContent>
      <SidebarFooter>
        <DashboardNavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
