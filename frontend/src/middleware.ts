import { NextRequest, NextResponse } from "next/server";
import { authGuard } from "./auth/authGuard";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    return NextResponse.next();
  }

  return authGuard(req);
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico|login|register).*)"],
};
