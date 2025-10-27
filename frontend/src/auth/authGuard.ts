import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function authGuard(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;
  const url = req.nextUrl.clone();

  if (!accessToken && !refreshToken) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};
