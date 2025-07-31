"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/currentUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      setUsername(result.data.username);
    };
    fetchData();
  }, []);

  return (
    <header className="max-w-[400px] relative">
      <div className="bg-amber-200 p-3 flex justify-between fixed top-0 right-0 left-0">
        <h1 className="text-left">ヘッダーです</h1>
        <div>{username && <p>こんにちは：{username}さん</p>}</div>

        <nav>
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
      </div>
    </header>
  );
}
