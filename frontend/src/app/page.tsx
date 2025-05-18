"use client";

import React, { useState, useEffect } from "react";
import { fetchTimerSettings } from "@/app/lib/fetchTimerSettings";
import { TimerDisplay } from "@/app/components/TimerDisplay";
import { usePomodoroTimer } from "@/app/components/usePomodoroTimer";
import { Header } from "./components/Header";
import Link from "next/link";
import { Slider } from "@/app/components/ui/slider";

export default function app() {
  // 初期値
  const [timerSettings, setTimerSettings] = useState({
    WORK_TIME: 1500,
    BREAK_TIME: 300,
    LONG_BREAK_TIME: 900,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTimerSettings();
      setTimerSettings(data);
    };
    fetchData();
  }, []);

  const timer = usePomodoroTimer({
    workTime: timerSettings.WORK_TIME,
    breakTime: timerSettings.BREAK_TIME,
    longBreakTime: timerSettings.LONG_BREAK_TIME,
  });

  return (
    <>
      <Header />

      <TimerDisplay {...timer} />
      <div className="w-96 flex justify-center items-center">
        <label className="block mb-2 text-sm font-medium">
          作業時間：{timerSettings.WORK_TIME / 60}分
        </label>
        <Slider
          value={[timerSettings.WORK_TIME / 60]}
          defaultValue={[timerSettings.WORK_TIME / 60]}
          onValueChange={(v) =>
            setTimerSettings({ ...timerSettings, WORK_TIME: v * 60 })
          }
          max={100}
          step={5}
        />
      </div>
      <Link href={"/timerform"}>時間変更はこちら</Link>
    </>
  );
}
