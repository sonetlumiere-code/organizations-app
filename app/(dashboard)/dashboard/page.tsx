import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    return <div>You must be signed in to view this page.</div>
  }

  // const data = await auth.api.listOrganizations()

  return (
    <div className="">
      <h1>Dashboard</h1>
      {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
      <pre>{JSON.stringify(session, null, 4)}</pre>
    </div>
  )
}
