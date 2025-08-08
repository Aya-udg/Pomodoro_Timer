import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  if (cookieStore.get("token")) {
    cookieStore.delete("token");
    return NextResponse.json({ message: "ログアウトしました" });
  }else{
    return NextResponse.json({error:'ログインしていません'},{ status: 400 })
  }
}
