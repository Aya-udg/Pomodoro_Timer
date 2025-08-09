import { TodoFormData } from "@/app/types/index";
import { Schedule } from "@/app/types/index";

export async function getSchedule(): Promise<Schedule[]> {
  const res = await fetch("/api/calendar", {
    method: "GET",
  });
  if (!res.ok) {
    console.error("データの取得に失敗しました", res.status);
    return [];
  }
  const resData = await res.json();
  return resData;
}

export async function postSchedule(data: TodoFormData) {
  const res = await fetch("/api/calendar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await res.json();
  return resData;
}

// idはURLに渡す
export async function deleteSchedule(id: string) {
  const res = await fetch(`/api/calendar/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    console.log("削除に失敗しました");
  }
  const resData = await res.json();
  return resData;
}

export async function updateSchedule(schedule: Schedule): Promise<Schedule[]> {
  const id = schedule.id;
  const res = await fetch(`/api/calendar/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(schedule),
  });
  if (!res.ok) {
    console.log("更新に失敗しました");
  }
  const resData = await res.json();
  console.log(resData);
  return resData;
}
