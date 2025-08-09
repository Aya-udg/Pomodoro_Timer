import { error } from "console";
import { NextResponse, NextRequest } from "next/server";

const DB_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: NextRequest) {
  const res = await fetch(`${DB_URL}/studyhistory/summary-by-date`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json({ data }, { status: 200 });
}

// export async function getStudyHistoryTag() {
//     const res = await fetch(`${DB_URL}/studyhistory/summary-by-tag`)
//     if(!res.ok){
//         return console.log('エラー発生')
//     }
//     const date = await res.json()
//     return date
// }

export async function POST(request: NextRequest) {
  const res = await fetch(`${DB_URL}/studyhistory/pos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  const data = await res.json();
  if (!res.ok) {
  return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json({ data }, { status: 200 });
}
