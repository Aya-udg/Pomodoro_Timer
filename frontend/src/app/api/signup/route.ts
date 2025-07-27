import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const res = await fetch("http://127.0.0.1:8000/users/register/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();

  if (res.ok) {
    return NextResponse.json({ data }, { status: 200 });
  } else {
    return NextResponse.json({ data }, { status: 500 });
  }
}
