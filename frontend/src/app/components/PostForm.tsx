"use client";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Chat, ChatHistory } from "@/app/types/index";
import { postChat, getChat } from "@/lib/api/chat";
import { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import Posts from "./Posts";

export default function PostForm() {
  const { register, handleSubmit, reset } = useForm<Chat>();
  const [chats, setChats] = useState<ChatHistory[]>([]);

  const targetRef = useRef<HTMLDivElement | null>(null);

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
      if (res.error) return toast.error(res.error);
      setChats([...res.data]);
    };
    fecthData();
  }, []);

  // チャットが送信されたら自動スクロール
  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [chats]);

  return (
    <>
      <div className="grid gap-3 w-3/5 ">
        <Toaster />
        <Posts chats={chats} />
        <div className="sticky bottom-0 bg-white">
          <form
            className="flex mb-10 items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Textarea
              placeholder="メッセージ"
              {...register("message", {
                maxLength: 50,
              })}
            />
            <div>
              <Button type="submit">投稿</Button>
            </div>
          </form>
        </div>
      </div>
      <div ref={targetRef}></div>
    </>
  );
}
