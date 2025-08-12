import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const DB_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "認証に失敗しました", code: "no_token" },
      { status: 401, headers: { "WWW-Authenticate": "Bearer" } }
    );
  }
  const res = await fetch(`${DB_URL}/users/me/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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
