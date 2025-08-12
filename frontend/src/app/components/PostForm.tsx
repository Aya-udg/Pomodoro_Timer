"use client";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Chat } from "@/app/types/index";
import postChat from "@/lib/api/chat";
import { useState, useEffect } from "react";

export default function PostForm() {
  const { register, handleSubmit, reset, formState } = useForm<Chat>();
  const [chats, setChats] = useState<Chat[]>([]);

  const today = new Date();
  const date = today.toLocaleDateString();

  const onSubmit: SubmitHandler<Chat> = async (message) => {
    const request = {
      ...message,
      date: date,
    };
    const res = await postChat(request);
    reset();
    setChats([res.date, res.message, res.response]);
  };

  useEffect(() => {
    const fecthData = async () => {
      const data = await getStudyHistoryDay();
      if (!data) {
        toast.error("ログインしてください");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        setStudydata(data.data);
      }
    };
    fecthData();
  }, []);

  return (
    <>
      <div className="grid gap-3 w-3/5">
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
