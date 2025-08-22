import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

const DB_URL = process.env.NEXT_PUBLIC_API_URL

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();

  const form = await request.formData();

  const username = form.get("username") as string;
  const password = form.get("password") as string;

  const res = await fetch(`${DB_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ username, password }),
  });

  const data = await res.json();
   // ★ FastAPI が出した Set-Cookie を転送
  const setCookie = res.headers.get('"set-cookie')
  if (setCookie) res.headers.set("set-cookie", setCookie);
  
  cookieStore.set("token",data.access_token,{httpOnly:true});
  if (res.ok) {
    return NextResponse.json({ data }, { status: 200 });
  } else {
    return NextResponse.json({ error: data }, { status: 500 });
  }
}
