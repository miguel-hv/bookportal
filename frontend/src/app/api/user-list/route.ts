import { fetchFromBackend } from "@/lib/fetchBackend";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = process.env.PUBLIC_API_BASE_URL;

export async function GET(req: NextRequest) {
     try {
    const res = await fetchFromBackend("/user/user-list", { method: "GET" });

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
