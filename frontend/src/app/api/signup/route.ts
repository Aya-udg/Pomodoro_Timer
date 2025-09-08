import { NextResponse } from "next/server";

const DB_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: Request) {
  const body = await request.json();

  const res = await fetch(`${DB_URL}/users/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  
  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null; // JSONじゃなかった or 空だったらここ
  }

  if (res.status == 401)
    return NextResponse.json({ error: data?.detail?.code ?? "認証エラー" }, { status: 401 });
  if (!res.ok) return NextResponse.json({ error: data?.detail ?? "登録失敗"  }, { status: 500 });
  return NextResponse.json({ data }, { status: 200 });
}
