import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function authGuard(req: NextRequest) {
  const token = req.cookies.get('access_token');
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();

};
