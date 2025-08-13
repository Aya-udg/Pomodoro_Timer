import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";


const DB_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "ログインしていません" },
      { status: 401 }
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
      { error: "ログインしていません" },
      { status: 401 }
    
    );
  }
  const res = await fetch(`${DB_URL}/chats_history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (res.status == 401) {
    if (data.detail.code === "トークンの有効期限切れです") {
      cookieStore.delete("token");
      return NextResponse.json({ error: data.detail.code }, { status: 401 });
    } else if (data.detail.code === "ユーザーが見つかりません") {
      return NextResponse.json({ error: data.detail.code }, { status: 401 });
    }
  }
  if (!res.ok) {
    return NextResponse.json({ error: "エラー" }, { status: 500 });
  }
  return NextResponse.json({ data }, { status: 200 });
}
