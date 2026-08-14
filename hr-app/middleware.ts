import { NextResponse, type NextRequest } from "next/server";
import { sessionCookieValid } from "@/lib/session";

export function middleware(request: NextRequest) {
  const signedIn = sessionCookieValid(request.cookies.get("contoso_hr")?.value);
  const path = request.nextUrl.pathname;

  if (path.startsWith("/people") && !signedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (path === "/login" && signedIn) {
    return NextResponse.redirect(new URL("/people", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/people/:path*", "/login"],
};
