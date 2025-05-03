"use client";

import React from "react";
import { useTimer } from "react-timer-hook";
import { useEffect, useState } from "react";

// サーバーコンポーネントにする
const startTimer = async () => {
  try {
    const res = await fetch("http://127.0.0.1:5000/api/timer");
    const data = await res.json();
    const WORK_TIME = data.set_time * 60; // 分 → 秒 に変換しとく
    const BREAK_TIME = data.break_time * 60;
    const LONG_BREAK_TIME = data.long_break_time * 60;

    return {
      WORK_TIME,
      BREAK_TIME,
      LONG_BREAK_TIME,
    };
  } catch (error) {
    console.error("エラーが発生したで！😱", error);
    return {
      WORK_TIME: 1500,
      BREAK_TIME: 300,
      LONG_BREAK_TIME: 900,
    };
  }
};

interface MyTimerProps {
  workTime: number;
  breakTime: number;
  longBreakTime: number;
}

function MyTimer({ workTime, breakTime, longBreakTime }: MyTimerProps) {
  const [sessionCount, setSessionCount] = useState(0); // 4回でロング休憩
  const [timerType, setTimerType] = useState("timer"); //タイマーの状態
  const [isReady, setIsReady] = useState(false); // 初期化フラグ

  const getExpiryTime = (seconds: number) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + seconds); // 10 minutes timer
    return time;
  };

  const {
    totalSeconds,
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: getExpiryTime(workTime),
    autoStart: false,
    onExpire: () => endTimer(),
    interval: 1000,
  });

  // タイマーの初期表示をデータベースの値にする
  useEffect(() => {
    restart(getExpiryTime(workTime), false);
    setIsReady(true);
  }, [workTime]);

  // タイマー終了時の処理
  const endTimer = () => {
    console.log("現在のタイマータイプ:", timerType);
    console.log("セッションカウント:", sessionCount);

    if (timerType === "timer") {
      let newCount = sessionCount + 1;
      setSessionCount(newCount);

      if (newCount % 4 === 0) {
        setTimerType("longbreak");
        restart(getExpiryTime(longBreakTime), false);
        console.log("ロング休憩に切り替えました");
      } else {
        setTimerType("break");
        restart(getExpiryTime(breakTime), false);
        console.log("休憩に切り替えました");
      }
    } else {
      // 休憩が終わったら、通常のタイマーに戻す
      restart(getExpiryTime(workTime), false);
      setTimerType("timer");
      console.log("通常のタイマーに戻しました");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>react-timer-hook </h1>
      <p>ポモドーロ</p>
      <div style={{ fontSize: "100px" }}>
        <span>{minutes}</span>:
        <span>{seconds % 60 < 10 ? `0${seconds % 60}` : seconds}</span>
      </div>
      <p>{isRunning ? "動作中" : "停止中"}</p>
      <button
        className="inline-flex mx-2 h-12 items-center justify-center rounded-md bg-blue-600 px-6 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition active:scale-95"
        onClick={start}
      >
        開始
      </button>
      <button
        className="inline-flex mx-2 h-12 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition active:scale-95"
        onClick={pause}
      >
        一時停止
      </button>
      <button
        className="inline-flex mx-2 h-12 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition active:scale-95"
        onClick={resume}
      >
        Resume
      </button>
      <button
        className="inline-flex mx-2 h-12 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition active:scale-95"
        onClick={() => {
          setSessionCount(0);
          setTimerType("timer");
          restart(getExpiryTime(workTime), false);
        }}
      >
        リスタート
      </button>
    </div>
  );
}

export default function App() {
  const [timerValues, setTimerValues] = useState({
    WORK_TIME: 1500,
    BREAK_TIME: 300,
    LONG_BREAK_TIME: 900,
  });

  useEffect(() => {
    const fechData = async () => {
      const data = await startTimer();
      if (data) {
        setTimerValues(data);
      }
    };
    fechData();
  }, []);

  return (
    <div>
      <MyTimer
        workTime={timerValues.WORK_TIME}
        breakTime={timerValues.BREAK_TIME}
        longBreakTime={timerValues.LONG_BREAK_TIME}
      />
    </div>
  );
}
