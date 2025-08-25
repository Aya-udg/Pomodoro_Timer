"use client";

import { useState } from "react";
import { TimerDisplay } from "@/app/components/TimerDisplay";
import { usePomodoroTimer } from "@/app/components/usePomodoroTimer";
import { MyTimer } from "@/app/types/index";
import TimerSlider from "@/app/components/TimerSlider";
import { useAlarmSound } from "@/app/components/sound";
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

export default function App() {
  const { cuckooClockPlay, fanfarePlay } = useAlarmSound();
  // 初期値
  const [timerSettings, setTimerSettings] = useState<MyTimer>(DEFAULT_TIMER);

  const timer = usePomodoroTimer(timerSettings, cuckooClockPlay, fanfarePlay);

  return (
    <>
      <Header />
      <div className="h-screen">
        <div className="flex flex-col items-center justify-center mx-auto pt-10 sm:pt-30">
          <TimerDisplay {...timer} />
          <DropdownMenu>
            <DropdownMenuTrigger className="mt-10 py-2 px-5 bg-sky-500 transition hover:bg-sky-600 rounded-2xl text-white font-black">
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
        <div className="mt-10 text-center">
          <p>タイマー、カレンダーは会員登録なしで使用できます</p>
          <p>
            ※勉強時間の記録・スケジュールの登録・AIとのチャットは非会員の方は利用できません
          </p>
        </div>
      </div>
    </>
  );
}
