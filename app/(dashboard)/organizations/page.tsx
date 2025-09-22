import { DashboardContainer } from "@/components/dashboard/layout/dashboard-container"
import { Icons } from "@/components/icons"
import OrganizationAvatar from "@/components/organization-avatar"
import DeleteOrganization from "@/components/organizations/delete-organization"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getOrganizations } from "@/data/auth/organization"
import { auth } from "@/lib/auth/auth"
import { getCachedSession } from "@/lib/auth/cached-session"
import { LANDING_ROUTE } from "@/routes"
import { format } from "date-fns"
import { headers } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"

const OrganizationsPage = async () => {
  const session = await getCachedSession()

  if (!session) {
    return redirect(LANDING_ROUTE)
  }

  const userId = session.user.id

  const userOrganizations = await getOrganizations({
    where: {
      members: { some: { userId } },
    },
    include: {
      members: {
        where: { userId },
        select: { role: true },
      },
    },
  })

  console.log(userOrganizations)

  const canEdit = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        organization: ["update"],
      },
    },
  })

  const canDelete = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        organization: ["delete"],
      },
    },
  })

  return (
    <DashboardContainer
      breadcrumbs={[{ label: "Organizations", href: "/organizations" }]}
    >
      <h1>Organizations</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Organization</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead className="hidden md:block">Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userOrganizations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>
                <div className="py-6 text-center text-sm text-muted-foreground">
                  No organizations found.
                </div>
              </TableCell>
            </TableRow>
          ) : (
            userOrganizations.map((org) => (
              <TableRow key={org.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <OrganizationAvatar
                      orgLogo={org.logo}
                      orgName={org.name}
                      orgSlug={org.slug}
                    />

                    <div className="flex flex-col">
                      <span className="font-medium">{org.name}</span>
                      {org.slug && (
                        <span className="text-xs text-muted-foreground">
                          {org.slug}
                        </span>
                      )}
                    </div>
                  </div>
                </TableCell>

                <TableCell>{org.slug ?? "—"}</TableCell>

                <TableCell className="hidden md:block">
                  {format(org.createdAt, "dd/MM/yyyy")}
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <Icons.moreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Show menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      {canEdit.success && (
                        <Link href={`/organizations/edit/${org.id}`}>
                          <DropdownMenuItem>
                            <Icons.edit className="h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </Link>
                      )}

                      {canDelete.success && (
                        <DropdownMenuItem>
                          <DeleteOrganization organization={org} />
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </DashboardContainer>
  )
}

export default OrganizationsPage
