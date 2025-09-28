import { Member, Organization, User } from "@prisma/client"

export type PopulatedOrganization = Organization & {
  members?: PopulatedMember[]
}

export type PopulatedMember = Member & {
  user?: User
  organization?: Organization
}

export type Role = "owner" | "admin" | "member"
