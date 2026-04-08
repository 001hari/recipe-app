import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("chef_token");

  if (!token && request.nextUrl.pathname.startsWith("/manage")) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("error", "login_required");

    return NextResponse.redirect(url);
  }

  console.log("Middleware:", request.nextUrl.pathname);

  return NextResponse.next();
}

export const config = {
  matcher: ["/manage/:path*"],
};