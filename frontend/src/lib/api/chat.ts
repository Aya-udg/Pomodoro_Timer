import { Chat } from "@/app/types/index";

export default async function postChat(chat: Chat) {
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chat),
  });
  if (res.status === 401) return;
  const resData = await res.json();
  return resData;
}
