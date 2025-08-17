import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    return <div>You must be signed in to view this page.</div>
  }

  return (
    <div>
      <pre>{JSON.stringify({ session }, null, 2)}</pre>
    </div>
  )
}
