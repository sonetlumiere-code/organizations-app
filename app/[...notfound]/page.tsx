import { LANDING_ROUTE } from "@/routes"
import { redirect } from "next/navigation"

export default function NotFound() {
  return redirect(LANDING_ROUTE)
}
