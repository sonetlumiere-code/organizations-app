"use client"

import { authClient } from "@/lib/auth/auth-client"

const ActiveOrganization = () => {
  const { data: activeOrganization } = authClient.useActiveOrganization()

  console.log({ activeOrganization })

  return (
    <div>
      {activeOrganization ? (
        <>
          <h2>Active organization:</h2>
          <pre>{JSON.stringify(activeOrganization, null, 4)}</pre>
        </>
      ) : null}
    </div>
  )
}

export default ActiveOrganization
