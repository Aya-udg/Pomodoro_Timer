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
import { Button } from "@/app/components/ui/button";

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
    } else toast.error("ログインしていません");
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/currentuser");
      if (res.status === 401) return;
      const result = await res.json();
      if (res.ok) {
        setUsername(result.data?.username);
      } else if (result.error === "再ログインしてください") {
        setUsername("");
        toast.error(result.error);
        setTimeout(() => {
          router.push("/top");
        }, 1500);
      } else if (result.error === "ログインしていません") return;
      else toast.error(result.error);
    };
    fetchData();
  }, []);

  return (
    <>
      <header className="relative z-10">
        <Toaster />
        <div className="hidden md:block border  bg-[#FFFFF4] border-b-2  p-3 justify-between fixed top-0 right-0 left-0 h-15">
          <div className="flex justify-between items-center">
            <p className="responsive-text">
              こんにちは：{username ? username : "ゲスト"}さん
            </p>
            <nav>
              <Link className="responsive-text mx-5" href="/top">
                TOP
              </Link>
              <Link className="responsive-text mx-5" href="/calendar">
                カレンダー
              </Link>
              <Link className="responsive-text mx-5" href="/graph">
                グラフ
              </Link>
              <Link className="responsive-text mx-5" href="/chat">
                チャット
              </Link>
              {username ? (
                <button
                  className="responsive-text inline-flex h-10 items-center justify-center rounded-md px-3 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition active:scale-95 btn-red"
                  onClick={logout}
                >
                  ログアウト
                </button>
              ) : (
                <Link
                  className="responsive-text mx-5 inline-flex h-10 items-center justify-center rounded-md px-3 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition active:scale-95 bg-blue-600"
                  href="/login"
                >
                  ログイン
                </Link>
              )}
            </nav>
          </div>
        </div>

        {/* モバイル用メニュー */}
        <div className="md:hidden flex justify-end items-center bg-[#FFFFF4]">
          <p className="responsive-text">
            こんにちは：{username ? username : "ゲスト"}さん
          </p>
          <Link className="mx-3 text-s" href="/top">
            TOP
          </Link>
          <Link className="mx-5 text-s" href="/login">
            ログイン
          </Link>
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
                <SheetTitle className="text-center pt-10">メニュー</SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <nav className="grid grid-cols-1">
                <Button variant="link" asChild>
                  <Link className="py-2 px-5" href="/calendar">
                    カレンダー
                  </Link>
                </Button>
                <Button variant="link" asChild>
                  <Link className="py-2 px-5" href="/graph">
                    グラフ
                  </Link>
                </Button>
                <Button variant="link" asChild>
                  <Link className="py-2 px-5" href="/chat">
                    チャット
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
