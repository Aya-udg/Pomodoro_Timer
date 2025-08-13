"use client";
import Link from "next/link";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useUserStore } from "@/app/components/userStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";

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
      const result = await res.json();
      if (res.status === 401) return;
      if (res.ok) {
        setUsername(result.data.username);
      }
    };
    fetchData();
  }, [setUsername]);

  return (
    <>
      <header className="max-w-[400px] relative">
        <Toaster />
        <div className="hidden sm:block border border-b-3 bg-neutral-50 p-3 justify-between fixed top-0 right-0 left-0 h-15">
          <div className="flex">
            <h1 className="text-left">ロゴ</h1>
            <p>こんにちは：{username ? username : "ゲスト"}さん</p>
            <nav>
              <button>
                <Link className="mx-10" href="/top">
                  TOP
                </Link>
              </button>
              <button>
                <Link className="mx-10" href="/calendar">
                  カレンダー
                </Link>
              </button>
              <button>
                <Link className="mx-10" href="/timer">
                  タイマー
                </Link>
              </button>
              <button>
                <Link className="mx-10" href="/graph">
                  グラフ
                </Link>
              </button>
              <button>
                <Link className="mx-10" href="/chat">
                  チャット
                </Link>
              </button>
              <button>
                <Link className="mx-10" href="/login">
                  ログイン
                </Link>
              </button>
            </nav>
            <button onClick={logout}>ログアウト</button>
          </div>
        </div>

        <div className="sm:hidden flex justify-end ">
          <button>
            <Link className="mx-5" href="/top">
              TOP
            </Link>
          </button>
          <button>
            <Link className="mx-5" href="/login">
              ログイン
            </Link>
          </button>
          <button className="mr-15 mx-5" onClick={logout}>
            ログアウト
          </button>
          <Sheet>
            <SheetTrigger asChild>
              <button type="button" className=" text-white">
                <Image
                  className="m-5"
                  src="/menu.svg"
                  alt="menu"
                  width={40}
                  height={40}
                />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-60">
              <SheetHeader>
                <SheetTitle>メニュー</SheetTitle>
                <SheetDescription>リンクを選んでね</SheetDescription>
              </SheetHeader>
              <nav className="grid grid-cols-1">
                <Link className="mx-10" href="/calendar">
                  カレンダー
                </Link>
                <Link className="mx-10" href="/timer">
                  タイマー
                </Link>
                <Link className="mx-10" href="/graph">
                  グラフ
                </Link>
                <Link className="mx-10" href="/chat">
                  チャット
                </Link>
                <Link className="mx-10" href="/login">
                  ログイン
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
