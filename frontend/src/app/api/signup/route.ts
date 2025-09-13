import { NextResponse } from "next/server";

const DB_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: Request) {
  const body = await request.json();

  const res = await fetch(`${DB_URL}/users/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  
  const data = await res.json();
  if (res.status === 400)
    return NextResponse.json({ error: data?.detail?.code ?? "ユーザー名が重複しています" }, { status: 400 });
  if (!res.ok) return NextResponse.json({ error: data?.detail ?? "登録失敗"  }, { status: 500 });
  return NextResponse.json({ data }, { status: 200 });
}
