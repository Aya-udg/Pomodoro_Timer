import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();

  const form = await request.formData();

  const username = form.get("username") as string;
  const password = form.get("password") as string;

  const res = await fetch("http://127.0.0.1:8000/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ username, password }),
  });

  const data = await res.json();
  cookieStore.set("token",data.access_token,{httpOnly:true});
  if (res.ok) {
    return NextResponse.json({ data }, { status: 200 });
  } else {
    return NextResponse.json({ error: data }, { status: 500 });
  }
}
