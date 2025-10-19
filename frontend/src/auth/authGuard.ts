import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const REFRESH_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/refresh`;

export async function authGuard(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;
  const url = req.nextUrl.clone();

  if (!accessToken && !refreshToken) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

 if (!accessToken && refreshToken) {
    const refreshRes = await fetch(REFRESH_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Cookie: `refresh_token=${refreshToken}`
      },
      credentials: "include",
    });

    if (refreshRes.ok) {
      const response = NextResponse.next();
      const setCookies = refreshRes.headers.getSetCookie();
      if (setCookies) {
        for (const cookie of setCookies)
          response.headers.append("Set-Cookie", cookie);
      }
      return response;
    }
     url.pathname = "/login";
     console.log("redirect authguard")
    // return NextResponse.redirect(url);
  }

  return NextResponse.next();
};
