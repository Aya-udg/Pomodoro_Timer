import { StudyHistory } from "@/app/types/index";

export default async function getStudyHistory(pos: StudyHistory) {
  const res = await fetch("http://127.0.0.1:8000/studyhistory/pos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pos),
  });
  if (!res.ok) {
    console.log("エラー");
  }
  const data = await res.json();
  console.log("登録成功", data);
  return data;
}
