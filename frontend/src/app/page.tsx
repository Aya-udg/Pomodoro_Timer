"use client";

import React, { useState, useEffect } from "react";
import { fetchTimerSettings } from "@/app/lib/fetchTimerSettings";
import { TimerDisplay } from "@/app/components/TimerDisplay";
import { usePomodoroTimer } from "@/app/components/usePomodoroTimer";
import { Header } from "./components/Header";
import { MyTimer } from "@/app/types/index";
import TimerSlider from "./components/TimerSlider";
import SimpleLineChart from "./components/SimapleLineChart";
import dynamic from "next/dynamic";

const DEFAULT_TIMER: MyTimer = {
  workTime: 1500,
  breakTime: 300,
  longBreakTime: 900,
};

const DynamicSimpleLineCharts = dynamic(
  () => import("@/app/components/SimapleLineChart"),
  {
    ssr: false,
  }
);

export default function app() {
  // 初期値
  const [timerSettings, setTimerSettings] = useState<MyTimer>(DEFAULT_TIMER);

  const fetchData = async () => {
    const data = await fetchTimerSettings();
    setTimerSettings(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const timer = usePomodoroTimer(timerSettings);

  return (
    <>
      <Header />
      <TimerDisplay {...timer} />
      <TimerSlider
        timerSettings={timerSettings}
        setTimerSettings={setTimerSettings}
      />
      <button
        className="btn-base btn-red"
        onClick={() => setTimerSettings(DEFAULT_TIMER)}
      >
        タイマー設定をリセットする
      </button>
      <DynamicSimpleLineCharts />
    </>
  );
}
