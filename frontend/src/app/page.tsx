"use client";

import { useState, useEffect } from "react";
import { fetchTimerSettings } from "@/app/lib/fetchTimerSettings";
import { TimerDisplay } from "@/app/components/TimerDisplay";
import { usePomodoroTimer } from "@/app/components/usePomodoroTimer";
import { MyTimer } from "@/app/types/index";
import TimerSlider from "./components/TimerSlider";
import { useAlarmSound } from "../app/components/sound";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import Header from "@/app/components/Header";

const DEFAULT_TIMER: MyTimer = {
  workTime: 1500,
  breakTime: 300,
  longBreakTime: 900,
};

export default function app() {
  const { cuckooClockPlay, fanfarePlay } = useAlarmSound();
  // 初期値
  const [timerSettings, setTimerSettings] = useState<MyTimer>(DEFAULT_TIMER);

  // const fetchData = async () => {
  //   const data = await fetchTimerSettings();
  //   setTimerSettings(data);
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  const timer = usePomodoroTimer(timerSettings, cuckooClockPlay, fanfarePlay);

  return (
    <>
      <Header />
      <TimerDisplay {...timer} />
      <div className="mt-10 flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="py-2 px-5 bg-sky-500 transition hover:bg-sky-600 rounded-2xl text-white font-black">
            タイマー設定
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-5">
            <TimerSlider
              timerSettings={timerSettings}
              setTimerSettings={setTimerSettings}
            />
            <div className="mt-5 flex justify-center">
              <button
                className="inline-flex h-10 items-center justify-center rounded-md px-5 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition active:scale-95 btn-red"
                onClick={() => setTimerSettings(DEFAULT_TIMER)}
              >
                タイマー設定をリセットする
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
