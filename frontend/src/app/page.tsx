"use client";

import Header from "@/app/components/Header";
import Link from "next/link";

export default function app() {
  return (
    <>
      <div className="mt-20">
        <div className="flex">
          <h1 className="font-dotgothic text-3xl">
            キャラクターと一緒に成長するアプリ
          </h1>
        </div>
        <Link className="mx-10" href="/top">
          <button>入る</button>
        </Link>
      </div>
    </>
  );
}
