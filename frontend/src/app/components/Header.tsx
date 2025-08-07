"use client";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useUserStore } from "@/app/components/userStore";
import { useEffect } from "react";

export default function Header() {
  const { username, setUsername } = useUserStore();

  const logout = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
    });
    if (res.ok) {
      toast.success("ログアウトしました！");
      setUsername("");
    } else {
      toast.error("ログインしていません");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/currentuser", {
        method: "GET",
      });
      const result = await res.json();
      if (res.ok) {
        setUsername(result.data.username);
      }
    };
    fetchData();
  }, [setUsername]);

  return (
    <header className="max-w-[400px] relative">
      <Toaster />
      <div className="bg-amber-200 p-3 flex justify-between fixed top-0 right-0 left-0">
        <h1 className="text-left">ヘッダーです</h1>
        <p>こんにちは：{username ? username : "ゲスト"}さん</p>
        <div>
          <button></button>
        </div>
        <nav>
          <Link className="mx-10" href="/calendar">
            カレンダー
          </Link>
          <Link className="mx-10" href="/">
            タイマー
          </Link>
          <Link className="mx-10" href="/graph">
            グラフ
          </Link>
          <Link className="mx-10" href="/login">
            ログイン
          </Link>
        </nav>
        <button onClick={logout}>ログアウト</button>
      </div>
    </header>
  );
}
