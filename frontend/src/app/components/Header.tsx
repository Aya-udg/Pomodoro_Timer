"use client";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useUserStore } from "@/app/components/userStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { username, setUsername } = useUserStore();

  const router = useRouter();

  const logout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });
    if (res.ok) {
      toast.success("ログアウトしました!TOPページに戻ります");
      setUsername("");
      setTimeout(() => {
        router.push("/top");
      }, 1500);
    } else {
      toast.error("ログインしていません");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/currentuser", {
        method: "GET",
      });
      // ログインしていないときは何もしない
      if (res.status === 401) return;

      if (res.ok) {
        const result = await res.json();
        setUsername(result.data.username);
      }
    };
    fetchData();
  }, [setUsername]);

  return (
    <header className="max-w-[400px] relative">
      <Toaster />
      <div className="bg-amber-200 p-3 flex justify-between fixed top-0 right-0 left-0 h-15">
        <h1 className="text-left">ヘッダーです</h1>
        <p>こんにちは：{username ? username : "ゲスト"}さん</p>
        <div>
          <button></button>
        </div>
        <nav>
          <Link className="mx-10" href="/">
            TOP
          </Link>
          <Link className="mx-10" href="/calendar">
            カレンダー
          </Link>
          <Link className="mx-10" href="timer">
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
