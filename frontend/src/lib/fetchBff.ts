import { redirect } from "next/navigation";

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
    const errBody = await res.json().catch(() => ({}));
    const error = new Error(errBody.error || res.statusText || "Request failed");
    (error as any).status = res.status;

    if (res.status === 401 || res.status === 403) {
      console.warn("Session expired or unauthorized:", errBody);

      redirect("/login");
    }
     
    throw error;
  }

  return res.json();
}
