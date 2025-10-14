import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // Call your backend auth service
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
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
  const token = data.token;

  // Set token in secure HttpOnly cookie
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: 'access_token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  });

  return response;
}
