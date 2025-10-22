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
  console.log("accessToken", accessToken);
  console.log("allcookies ", cookieStore.getAll().map(c => c.name));

  const buildHeaders = (token?: string) => ({
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  });

    console.log("tprimera llamada backend");
  let response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: buildHeaders(accessToken),
  });
    console.log(response);

  if (response.status === 401) {
    console.log("token caducado");
    
    const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      credentials: "include",
    });

    console.log("refreshResponse status", refreshResponse.status);
    console.log("refreshResponse", refreshResponse);

    if (!refreshResponse.ok) {
      // Refresh failed — tokens invalid
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const refreshData = await refreshResponse.json();
    const newAccessToken = refreshData.token;

    console.log(newAccessToken);

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
