
const NEXT_API_BASE_URL = process.env.NEXT_API_BASE_URL;

/**
 * Generic helper to call nextjs BFF.
 */
export async function fetchBff(path: string, options: RequestInit = {}) {
  const res = await fetch(`${NEXT_API_BASE_URL}${path}`, {
    ...options,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include"
  });

  if (!res.ok) {
    console.error("bff: ", res);
    const errBody = await res.json().catch(() => ({}));
    const error = new Error(errBody.error || res.statusText || "Request failed");
    (error as any).status = res.status;
    throw error;
  }

  return res.json();
}
