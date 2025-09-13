import { Chat } from "@/app/types/index";

export async function postChat(chat: Chat) {
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chat),
  });
  const result = await res.json();
  if (!res.ok)
    return { ok: false, status: res.status,error:result.error};
  return { ok: true, status: res.status, data: result.data };
}

export async function getChat() {
  const res = await fetch("/api/ai", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();
  if (!res.ok)
    return { ok: false, status: res.status,error:result.error};
  return { ok: true, status: res.status, data: result.data };
}
