import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const refreshToken = (await cookies()).get("refresh_token")?.value;

    if (!refreshToken) {
    return NextResponse.json(
        { message: "No refresh token provided" },
        { status: 401 }
    );
    }

    const res = await fetch(`${process.env.PUBLIC_API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        return NextResponse.json(
        { error: errorData.message || 'Failed to refresh token' },
        { status: res.status }
        );
    }

    const data = await res.json();
    const { token: newAccessToken, refreshToken: newRefreshToken } = data;

    const response = NextResponse.json({
      success: true,
      token: newAccessToken,
      refreshToken: newRefreshToken,
    });

    // Set new access token
    response.cookies.set({
    name: "access_token",
    value: newAccessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 15, // 15 minutes
    });

    // Long-lived refresh token
    response.cookies.set({
      name: 'refresh_token',
      value: newRefreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  
    return response;

  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
