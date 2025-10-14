"use server";

import { fetchWithAuth } from "@/lib/fetchWithAuth";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`;

export async function fetchUsers() {
  const res = await fetchWithAuth(`${BASE_URL}/user-list`, { method: 'GET' });

  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.statusText}`);
  }

  return res.json();
}
