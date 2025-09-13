import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const DB_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token)
    return NextResponse.json(
      { error: "ログインしていません" },
      { status: 400 }
    );
  const res = await fetch(`${DB_URL}/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) return NextResponse.json({ error: "エラー" }, { status: 500 });
  else {
    const response = NextResponse.json({ message: "ログアウトしました" });
    response.cookies.delete("token");
    response.cookies.delete("refresh_token");
    return response;
  }
}
