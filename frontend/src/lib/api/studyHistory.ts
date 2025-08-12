import { StudyHistory } from "@/app/types/index";

export async function getStudyHistoryDay() {
  const res = await fetch("/api/study", {
    method: "GET",
  });
  if (res.status === 401) return res;
  return await res.json();;
}


export default async function postStudyHistory(record: StudyHistory) {
  const res = await fetch("/api/study", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
  });
  console.log(res);
  if (res.status === 401) return res;
  const resData = await res.json();
  return resData;
}