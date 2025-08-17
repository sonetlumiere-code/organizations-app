import { LANDING_ROUTE } from "@/routes"
import { redirect } from "next/navigation"

type VerifyEmailPageSearchParams = {
  searchParams: Promise<{ token: string }>
}

const VerifyEmailPage = async ({
  searchParams,
}: VerifyEmailPageSearchParams) => {
  const { token } = await searchParams

  if (!token) redirect(LANDING_ROUTE)

  console.log(token)

  return <div>VerifyEmailPage</div>
}

export default VerifyEmailPage
