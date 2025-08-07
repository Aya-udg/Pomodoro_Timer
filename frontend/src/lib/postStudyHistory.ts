import { StudyHistory } from "@/app/types/index";

const DB_URL = process.env.NEXT_PUBLIC_API_URL

export default async function postStudyHistory(pos: StudyHistory) {
  const res = await fetch(`${DB_URL}/studyhistory/pos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pos),
  });
  console.log(res)
  if (!res.ok) {
    console.log("エラー");
  }
  const data = await res.json();
  console.log("登録成功", data);
  return data;
}
