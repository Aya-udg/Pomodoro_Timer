"use client";

import React from "react";
import { useEffect, useState } from "react";

export default function Home() {
  const [time, setTime] = useState(1500); // 初期値25分
  const [isRunning, setIsRunning] = useState(false); // ⏱ タイマー状態を管理！
  const [status, setstatus] = useState("start"); // タイマーの状態を管理
  const [hasStarted, setHasStarted] = useState(false); // タイマーが開始されたかどうか

  useEffect(() => {
    if (!isRunning) return; // タイマーが動いていないときは何もしない
    // fetchItems();
    const interval = setInterval(() => {
      setTime((prev: number) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // タイマーを開始する関数(flaskのAPIを叩く)
  const startTimer = async () => {
    // タイマーが開始済の場合は途中から再開する
    if (time !== 1500) {
      setIsRunning(true);
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/api/timer");
      const data = await res.json();
      setTime(data.set_time * 60); // 分 → 秒 に変換しとく
      setIsRunning(true); // タイマーをスタートするで！
      setHasStarted(true); //APIを取得したらtrue
    } catch (error) {
      console.error("エラーが発生したで！😱", error);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className=" flex items-center justify-center">うーたん</h1>
      <div className=" flex items-center justify-center flex-col">
        <p>残り時間</p>
        <p className="text-5xl font-bold">
          {Math.floor(time / 60)}:{time % 60 < 10 ? `0${time % 60}` : time % 60}
        </p>
        <p>{status === "stop" ? "一時停止中" : ""}</p>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="inline-flex mx-2 h-12 items-center justify-center rounded-md bg-blue-600 px-6 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition active:scale-95"
          onClick={() => {
            startTimer();
            setstatus("start");
          }}
        >
          開始
        </button>
        <button
          className="inline-flex mx-2 h-12 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition active:scale-95"
          onClick={() => {
            setIsRunning(false);
            setstatus("stop");
          }}
        >
          一時停止
        </button>
        <button
          className="inline-flex mx-2 h-12 items-center justify-center rounded-md bg-red-500 px-6 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition active:scale-95"
          onClick={() => {
            setIsRunning(false);
            setTime(1500); // タイマーをリセットする
            setstatus("crear");
          }}
        >
          停止
        </button>
      </div>
    </div>
  );
}
