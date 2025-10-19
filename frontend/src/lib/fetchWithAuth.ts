"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


const REFRESH_URL = `http://localhost:3000/api/refresh`;

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const cookieStore = cookies();
  let token = (await cookieStore).get('access_token')?.value;

  const buildHeaders = (token?: string) => ({
    ...(options.headers || {}),
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  });

  let res = await fetch(url, { ...options, headers: buildHeaders(token) });

  if (res.status === 401) {
    const refreshRes = await fetch(REFRESH_URL, {
       method: "POST",
       headers: {
        Cookie: (await cookieStore).toString()
       },
       });

    if (!refreshRes.ok) {
      console.log("not refresh ok");
      console.log(refreshRes);
     console.log("redirect refreshres")

      // redirect("/login");
    }
      console.log("refreshRes",refreshRes);

    if (refreshRes.ok) {
      const refreshData = await refreshRes.json();
      const newToken = refreshData.token;
      

      console.log("new token", newToken);

        if (!newToken) {
          console.log("not new token ok");
          console.log(newToken);
          console.log("redirect newtoken")

          // redirect("/login");
        }

      res = await fetch(url, { ...options, headers: buildHeaders(newToken) });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${res.status}`);
      }

      return res.json();
    }
  } 

  if (!res.ok) {
    console.log('res not ok')
    console.log(res)
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP ${res.status}`);
  }

  try {
    return await res.json();
  } catch {
    return res;
  }
}
