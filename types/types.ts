import { Member, Organization } from "@prisma/client"

export type PopulatedOrganization = Organization & {
  members?: Member[]
}
