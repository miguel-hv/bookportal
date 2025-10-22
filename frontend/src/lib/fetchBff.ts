
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

  console.log("fetchbff res: ", res);

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `HTTP ${res.status}`);
  }

  return res.json();
}
