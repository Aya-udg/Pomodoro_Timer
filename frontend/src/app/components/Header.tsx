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
      console.log(result);
      if (res.status === 401) return;
      if (res.ok) {
        setUsername(result.data.username);
      }
    };
    fetchData();
  }, [setUsername]);

  return (
    <>
      <header className="relative">
        <Toaster />
        <div className="hidden md:block border border-b-3 bg-neutral-50 p-3 justify-between fixed top-0 right-0 left-0 h-15">
          <div className="flex justify-between items-center">
            <h1 className="text-left items-center">ロゴ</h1>
            <p className="responsive-text">
              こんにちは：{username ? username : "ゲスト"}さん
            </p>
            <nav>
              <button>
                <Link className="responsive-text mx-5" href="/top">
                  TOP
                </Link>
              </button>
              <button>
                <Link className="responsive-text mx-5" href="/calendar">
                  カレンダー
                </Link>
              </button>
              <button>
                <Link className="responsive-text mx-5" href="/timer">
                  タイマー
                </Link>
              </button>
              <button>
                <Link className="responsive-text mx-5" href="/graph">
                  グラフ
                </Link>
              </button>
              <button>
                <Link className="responsive-text mx-5" href="/chat">
                  チャット
                </Link>
              </button>
              <button>
                <Link
                  className="responsive-text mx-5 inline-flex h-10 items-center justify-center rounded-md px-3 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition active:scale-95 bg-blue-600"
                  href="/login"
                >
                  ログイン
                </Link>
              </button>
              <button
                className="responsive-text inline-flex h-10 items-center justify-center rounded-md px-3 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition active:scale-95 btn-red"
                onClick={logout}
              >
                ログアウト
              </button>
            </nav>
          </div>
        </div>
        <div className="md:hidden flex justify-end">
          <button>
            <Link className="mx-3 text-s" href="/top">
              TOP
            </Link>
          </button>
          <button>
            <Link className="mx-5 text-s" href="/login">
              ログイン
            </Link>
          </button>
          <button className="pr-10 text-s" onClick={logout}>
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
                <SheetTitle className="text-center">メニュー</SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <nav className="grid grid-cols-1">
                <button className="mx-10">
                  <Link
                    className="py-2 px-5 border rounded-full"
                    href="/calendar"
                  >
                    カレンダー
                  </Link>
                </button>
                <button className="mt-10">
                  <Link className="py-2 px-5 border rounded-full" href="/timer">
                    タイマー
                  </Link>
                </button>
                <button className="mt-10">
                  <Link className="py-2 px-5 border rounded-full" href="/graph">
                    グラフ
                  </Link>
                </button>
                <button className="mt-10">
                  <Link className="py-2 px-5 border rounded-full" href="/chat">
                    チャット
                  </Link>
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
