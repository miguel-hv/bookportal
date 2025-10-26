import { fetchBackend } from "@/lib/fetchBackend";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = await fetchBackend("/user/user-list", { method: "GET" });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    console.log("user list fetch", err);
    return NextResponse.json(
      { error: err.message || "Unauthorized" },
      { status: err.status || 401 }
    );
  }
}
