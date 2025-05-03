"use client";

import React, { useState, useEffect } from "react";
import { fetchTimerSettings } from "@/app/lib/fetchTimerSettings";
import { TimerDisplay } from "@/app/components/TimerDisplay";
import { usePomodoroTimer } from "@/app/components/usePomodoroTimer";

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

  return <TimerDisplay {...timer} />;
}
