import { error } from "console";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

const DB_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "認証されていません" }, { status: 401 });
  }
  const res = await fetch(`${DB_URL}/studyhistory/summary-by-date`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json({ error }, { status: 500 });
  }
  const data = await res.json();
  return NextResponse.json({ data }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const record = await request.json()
  if (!token) {
    return NextResponse.json({ error: "認証されていません" }, { status: 401 });
  }
  const res = await fetch(`${DB_URL}/studyhistory/pos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(record),
  });

  if (!res.ok) {
    return NextResponse.json({ error }, { status: 500 });
  }
  const data = await res.json();
  return NextResponse.json({ data }, { status: 200 });
}
