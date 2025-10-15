import { NextRequest } from "next/server";
import { authGuard } from "./auth/authGuard";

export function middleware(req: NextRequest) {
  return authGuard(req);
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico|login|register).*)"],
};
