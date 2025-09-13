import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const DB_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { error: "ログインしていません" },
      { status: 401 }
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
  if (res.status === 401) {
    if (data.detail === "トークンの有効期限切れです") {
      // リフレッシュトークンの検証
      const refresh_token = cookieStore.get("refresh_token")?.value;
      const res = await fetch(`${DB_URL}/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refresh_token}`,
        },
      });
      if (!res.ok) {
        // 古いアクセストークンの削除
        cookieStore.delete("token");
        return NextResponse.json(
          { error: "再ログインしてください" },
          { status: 401 }
        );
      } else {
        const data = await res.json();
        cookieStore.set("token", data.access_token, {
          path: "/",
          httpOnly: true,
          secure:true,
        });
        return NextResponse.json({ username: data.username }, { status: 200 });
      }
    } else if (data.detail === "ユーザーが見つかりません")
      return NextResponse.json({ error: data.detail }, { status: 401 });
  }
  if (!res.ok) return NextResponse.json({ error: data.detail ?? 'エラーが発生しました'}, { status: res.status });
  return NextResponse.json({ data }, { status: 200 });
}
