import { fetchBackend } from "@/lib/fetchBackend";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
    console.log("cookie keys in BFF route:", cookieStore.getAll().map(c => c.name));

     try {
    console.log(" llamada bff");

    const res = await fetchBackend("/user/user-list", { method: "GET" });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("BFF /api/users error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
