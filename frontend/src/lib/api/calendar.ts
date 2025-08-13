import { TodoFormData } from "@/app/types/index";
import { Schedule } from "@/app/types/index";

export async function getSchedule() {
  const res = await fetch("/api/calendar");
  const result = await res.json();
  if (res.status === 401)
    return { ok: false, status: res.status,error:result.error};
  return result;
}

export async function postSchedule(data: TodoFormData) {
  const res = await fetch("/api/calendar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (res.status === 401)
    return { ok: false, status: res.status,error:result.error};
  return result;
}

// idはURLに渡す
export async function deleteSchedule(id: string) {
  const res = await fetch(`/api/calendar/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    console.log("削除に失敗しました");
  }
  const result = await res.json();
  return result;
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
  const result = await res.json();
  return result;
}
