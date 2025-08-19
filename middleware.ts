import { getSessionCookie } from "better-auth/cookies"
import { NextRequest, NextResponse } from "next/server"
import {
  DASHBOARD_ROUTE,
  LANDING_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
} from "./routes"

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request)
  const { pathname } = request.nextUrl

  if (pathname.startsWith(DASHBOARD_ROUTE)) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL(LANDING_ROUTE, request.url))
    }
  }

  if ([SIGN_IN_ROUTE, SIGN_UP_ROUTE].includes(pathname)) {
    if (sessionCookie) {
      return NextResponse.redirect(new URL(DASHBOARD_ROUTE, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up"],
}
