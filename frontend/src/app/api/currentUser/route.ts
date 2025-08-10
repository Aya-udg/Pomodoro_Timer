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
  console.log(data)
  return NextResponse.json({ data }, { status: 200 });
}
