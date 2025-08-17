import LandingFooter from "@/components/landing/layout/footer/landing-footer"
import LandingHeader from "@/components/landing/layout/header/landing-header"

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <LandingHeader />
      <main className="w-full p-4">
        <div className="text-center">{children}</div>
      </main>
      <LandingFooter />
    </div>
  )
}
