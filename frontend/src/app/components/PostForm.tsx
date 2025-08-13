"use client";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Chat, ChatHistory } from "@/app/types/index";
import { postChat, getChat } from "@/lib/api/chat";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Posts from "./Posts";

export default function PostForm() {
  const { register, handleSubmit, reset, formState } = useForm<Chat>();
  const [chats, setChats] = useState<ChatHistory[]>([]);
  const router = useRouter();

  const today = new Date();
  const date = today.toLocaleDateString();

  const onSubmit: SubmitHandler<Chat> = async (message) => {
    const request = {
      ...message,
      date: date,
    };
    await postChat(request);
    reset();
    const chats = await getChat();
    setChats([...chats.data]);
  };

  useEffect(() => {
    const fecthData = async () => {
      const res = await getChat();
      if (res.status === 401) {
        toast.error(res.error);
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        setChats([...res.data]);
      }
    };
    fecthData();
  }, []);

  return (
    <>
      <div className="grid gap-3 w-3/5">
        <Toaster />
        <Posts chats={chats} />
        <Label htmlFor="message">メッセージ</Label>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Textarea
            placeholder="メッセージ"
            {...register("message", {
              maxLength: 50,
            })}
          />
          <Button type="submit">投稿</Button>
        </form>
      </div>
    </>
  );
}
