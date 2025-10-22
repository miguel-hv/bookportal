"use server";

import { fetchBff } from "@/lib/fetchBff";
import { cookies } from "next/headers";

export async function fetchUsers() {
    const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  return fetchBff("/user-list", {
    headers: {
      cookie: cookieHeader,
    },
  });
}
