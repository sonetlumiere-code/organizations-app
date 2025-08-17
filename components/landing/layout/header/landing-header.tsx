import { LANDING_ROUTE } from "@/routes"
import Link from "next/link"
import AdminMenu from "./admin-menu"
import SheetLandingHeader from "./sheet-landing-header"

const LandingHeader = () => {
  return (
    <header className="w-full bg-white shadow">
      <div className="mx-auto max-w-7xl py-5 px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          <div className="lg:flex lg:items-center lg:gap-12">
            <Link
              href={LANDING_ROUTE}
              className="flex items-center gap-2"
              prefetch={false}
            >
              <span className="text-2xl font-bold text-gray-900">
                {process.env.APP_NAME}
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block sm:gap-4">
              <AdminMenu />
            </div>

            <div className="block lg:hidden">
              <SheetLandingHeader />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default LandingHeader
