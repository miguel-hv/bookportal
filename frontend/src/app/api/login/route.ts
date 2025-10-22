import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.PUBLIC_API_BASE_URL;

export async function POST(req: Request) {
  try {
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
    console.log("token from login", token);
    console.log("refreshtoken from login", refreshToken);

    // Set token in secure HttpOnly cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: 'access_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 15, // 15 minutes
    });

    // Long-lived refresh token
    response.cookies.set({
      name: 'refresh_token',
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    const test = (await cookies()).get("access_token")?.value;
    console.log("cokie", test);
    return response;
    } catch (err) {
    console.error("Login route error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
