import { StudyHistory } from "@/app/types/index";

export async function getStudyHistoryDay() {
  const res = await fetch("/api/study", {
    method: "GET",
  });
  const result = await res.json();
  if (res.status === 401)
    return { ok: false, status: res.status,error:result.error};
  return result;
}



export default async function postStudyHistory(record: StudyHistory) {
  const res = await fetch("/api/study", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
  });
  const result = await res.json();
  if (res.status === 401)
    return { ok: false, status: res.status,error:result.error};
  return result;
}
