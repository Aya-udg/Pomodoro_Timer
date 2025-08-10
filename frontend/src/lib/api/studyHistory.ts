import { StudyHistory } from "@/app/types/index";

export async function getStudyHistoryDay() {
  const res = await fetch("/api/study", {
    method: "GET",
  });
  if (!res.ok) return;
  const date = await res.json();
  return date;
}

// export async function getStudyHistoryTag() {
//     const res = await fetch("/api/study")
//     if(!res.ok){
//         return console.log('エラー発生')
//     }
//     const date = await res.json()
//     return date
// }

export default async function postStudyHistory(record: StudyHistory) {
  const res = await fetch("/api/study", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
  });
  console.log(res);
  if (res.status === 401) return;
  const resData = await res.json();
  return resData;
}