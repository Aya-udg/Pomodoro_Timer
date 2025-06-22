"use client";

import React, { useState, useEffect } from "react";
import { fetchTimerSettings } from "@/app/lib/fetchTimerSettings";
import { TimerDisplay } from "@/app/components/TimerDisplay";
import { usePomodoroTimer } from "@/app/components/usePomodoroTimer";
import { Header } from "./components/Header";
import Link from "next/link";
import { Slider } from "@/app/components/ui/slider";
import { MyTimer } from "@/app/types/index";

export default function app() {
  // 初期値
  const [timerSettings, setTimerSettings] = useState<MyTimer>({
    workTime: 1500,
    breakTime: 300,
    longBreakTime: 900,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTimerSettings();
      setTimerSettings(data);
    };
    fetchData();
  }, []);

  const timer = usePomodoroTimer({
    workTime: timerSettings.workTime,
    breakTime: timerSettings.breakTime,
    longBreakTime: timerSettings.longBreakTime,
  });

  return (
    <>
      <Header />

      <TimerDisplay {...timer} />
      <div className="w-96 flex justify-center items-center">
        <label className="block mb-2 text-sm font-medium">
          作業時間：{timerSettings.workTime / 60}分
        </label>
        <Slider
          value={[timerSettings.workTime / 60]}
          defaultValue={[timerSettings.workTime / 60]}
          onValueChange={(v) =>
            setTimerSettings({ ...timerSettings, workTime: v[0] * 60 })
          }
          max={100}
          step={5}
        />
      </div>
      <div className="w-96 flex justify-center items-center">
        <label className="block mb-2 text-sm font-medium">
          休憩時間：{timerSettings.breakTime / 60}分
        </label>
        <Slider
          value={[timerSettings.breakTime / 60]}
          defaultValue={[timerSettings.breakTime / 60]}
          onValueChange={(v) =>
            setTimerSettings({ ...timerSettings, breakTime: v[0] * 60 })
          }
          max={100}
          step={1}
        />
      </div>
      <div className="w-96 flex justify-center items-center">
        <label className="block mb-2 text-sm font-medium">
          長い休憩時間：{timerSettings.longBreakTime / 60}分
        </label>
        <Slider
          value={[timerSettings.longBreakTime / 60]}
          defaultValue={[timerSettings.longBreakTime / 60]}
          onValueChange={(v) => {
            setTimerSettings({ ...timerSettings, longBreakTime: v[0] * 60 });
          }}
          max={100}
          step={1}
        />
      </div>
    </>
  );
}
