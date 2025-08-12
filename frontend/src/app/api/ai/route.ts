import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const DB_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "認証に失敗しました", code: "no_token" },
      { status: 401, headers: { "WWW-Authenticate": "Bearer" } }
    );
  }
  const body = await request.json();
  const res = await fetch(`${DB_URL}/ai`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    return NextResponse.json({ error: "エラー" }, { status: 500 });
  } else {
    const data = await res.json();
    return NextResponse.json({ data }, { status: 200 });
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "認証に失敗しました", code: "no_token" },
      { status: 401, headers: { "WWW-Authenticate": "Bearer" } }
    );
  }
  const res = await fetch(`${DB_URL}/chats_history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    return NextResponse.json({ error: "エラー" }, { status: 500 });
  } else {
    const data = await res.json();
    return NextResponse.json({ data }, { status: 200 });
  }
}
