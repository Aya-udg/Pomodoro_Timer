import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const DB_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "ログインしていません" },
      { status: 400 }
    );
  } else {
    const res = await fetch(`${DB_URL}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    cookieStore.delete("token");
    return NextResponse.json({ message: "ログアウトしました" });
  }
}
