"use server";

import { fetchBff } from "@/lib/fetchBff";

export async function fetchUsers() {
  return fetchBff("/api/user-list");
}
