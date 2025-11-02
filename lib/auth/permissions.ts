import { createAccessControl } from "better-auth/plugins/access"
import {
  defaultStatements,
  ownerAc,
} from "better-auth/plugins/organization/access"

const statement = {
  ...defaultStatements,
  product: ["create", "share", "update", "delete", "read"],
} as const

const ac = createAccessControl(statement)

const member = ac.newRole({
  product: ["create"],
})

const admin = ac.newRole({
  product: ["create", "update"],
})

const owner = ac.newRole({
  ...ownerAc.statements,
  // organization: ownerAc.statements.organization,
  product: ["create", "update", "delete", "read"],
})

export { ac, admin, member, owner, statement }
