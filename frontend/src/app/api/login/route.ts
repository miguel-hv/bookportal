import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.PUBLIC_API_BASE_URL;

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const res = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    return NextResponse.json(
      { error: errorData.message || 'Login failed' },
      { status: res.status }
    );
  }

  const data = await res.json();
  const { token, refreshToken} = data;

  // Set token in secure HttpOnly cookie
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: 'access_token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 15, // 15 minutes
  });

  // Long-lived refresh token
  response.cookies.set({
    name: 'refresh_token',
    value: refreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  console.log("✅ Set login refresh token:", refreshToken);

  return response;
}
