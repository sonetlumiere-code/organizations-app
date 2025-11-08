import { DashboardContainer } from "@/components/dashboard/layout/dashboard-container"
import DeleteOrganization from "@/components/dashboard/organizations/delete-organization"
import { Icons } from "@/components/icons"
import OrganizationAvatar from "@/components/organization-avatar"
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
import { verifyUser } from "@/lib/auth/verify-user"
import { format } from "date-fns"
import { headers } from "next/headers"
import Link from "next/link"

const OrganizationsPage = async () => {
  const session = await verifyUser()
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
    <DashboardContainer breadcrumbs={[{ label: "Organizations" }]}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Organization</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead className="hidden md:md:table-cell">Created</TableHead>
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

                <TableCell className="hidden md:table-cell">
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

                      <Link href={`/dashboard/organizations/${org.id}`}>
                        <DropdownMenuItem>
                          <Icons.eye className="h-4 w-4" />
                          View
                        </DropdownMenuItem>
                      </Link>

                      {canEdit.success && (
                        <Link href={`/dashboard/organizations/edit/${org.id}`}>
                          <DropdownMenuItem>
                            <Icons.edit className="h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </Link>
                      )}

                      {canDelete.success && (
                        <DeleteOrganization organization={org}>
                          <DropdownMenuItem>
                            <Icons.trash2 className="w-4 h-4 text-destructive" />
                            <p className="text-destructive">Delete</p>
                          </DropdownMenuItem>
                        </DeleteOrganization>
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
