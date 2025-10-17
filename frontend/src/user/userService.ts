"use server";

import { fetchWithAuth } from "@/lib/fetchWithAuth";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`;

export async function fetchUsers() {
  const res = await fetchWithAuth(`${BASE_URL}/user-list`, { method: 'GET' });

    if (res.status === 401) {
    const data = await res.json();
    console.warn('Unauthorized:', data.message);

    throw new Error('Session expired');
  }

  if (!res.ok) {
    console.log(await res.text());
    throw new Error(`Failed to fetch users: ${res.statusText}`);
  }

  return res.json();
}
