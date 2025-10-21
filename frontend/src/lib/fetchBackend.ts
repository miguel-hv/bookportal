import { cookies } from "next/headers";

const BASE_URL = process.env.PUBLIC_API_BASE_URL;

/**
 * Generic helper to call the Java backend from Next.js BFF.
 * - Attaches access token from cookies
 * - Retries once if token expired (401) by calling /api/refresh
 * - Returns JSON response
 */
export async function fetchFromBackend(
  path: string,
  options: RequestInit = {}
) {
  const cookieStore = cookies();
  let accessToken = (await cookieStore).get("access_token")?.value;

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
    const refreshResponse = await fetch(`${BASE_URL}/refresh`, {
      method: "POST",
      headers: {
        Cookie: (await cookieStore).toString(),
      },
    });

    if (!refreshResponse.ok) {
      // Refresh failed — tokens invalid
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
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
