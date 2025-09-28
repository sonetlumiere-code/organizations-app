import { Member, Organization, User } from "@prisma/client"

export type ActionResponse<T = unknown> = {
  success: boolean
  data?: T
  error?: string
}

export type PopulatedOrganization = Organization & {
  members?: PopulatedMember[]
}

export type PopulatedMember = Member & {
  user?: User
  organization?: Organization
}

export type Role = "owner" | "admin" | "member"
