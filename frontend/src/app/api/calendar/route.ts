import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

const DB_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  const res = await fetch(`${DB_URL}/schedule`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    console.error("データの取得に失敗しました", res.status);
    return [];
  }
  const resData = await res.json();
  return resData;
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const res = await fetch(`${DB_URL}/schedule-registr`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });
  const data = await res.json();
  if (res.ok) {
    return NextResponse.json({ data }, { status: 200 });
  } else {
    return NextResponse.json({ data }, { status: 500 });
  }
}

export async function DELETE(id: NextRequest) {
  const res = await fetch(`${DB_URL}/schedule-delete/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    console.log("更新に失敗しました");
  }
  const resData = await res.json();
  console.log(resData);
  return resData;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const res = await fetch(`${DB_URL}/schedule-update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  if (!res.ok) {
    console.log("更新に失敗しました");
  }
  const resData = await res.json();
  console.log(resData);
  return resData;
}
