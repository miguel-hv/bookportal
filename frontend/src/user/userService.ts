"use server";

import { fetchWithAuth } from "@/lib/fetchWithAuth";

const BASE_URL = `${process.env.PUBLIC_API_BASE_URL}/user`;

export async function fetchUsers() {
  return fetchWithAuth(`${BASE_URL}/user-list`, { method: 'GET' });
}
