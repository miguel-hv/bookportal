import { cookies } from "next/headers";

const BASE_URL = process.env.PUBLIC_API_BASE_URL;

/**
 * Generic helper to call the backend from Next.js BFF.
 * - Attaches access token from cookies
 * - Retries once if token expired (401) by calling /api/refresh
 * - Returns JSON response
 */
export async function fetchBackend(
  path: string,
  options: RequestInit = {}
) {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  const buildHeaders = (token?: string) => ({
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  });

  let response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: buildHeaders(accessToken),
  });

  if (response.status === 401) {
    const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      credentials: "include",
    });

    if (!refreshResponse.ok) {
      const data = await refreshResponse.json();
      const backendMessage = data.message || "Unauthorized";
      return new Response(JSON.stringify({ error: backendMessage }), {
        status: refreshResponse.status || 401,
      });
    }

    const refreshData = await refreshResponse.json();
    const newAccessToken = refreshData.token;

    if (!newAccessToken) {
      return new Response(JSON.stringify({ error: "No new token" }), {
        status: 401,
      });
    }

    // Retry original request
    response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: buildHeaders(newAccessToken),
    });
  }

  return response;
}
