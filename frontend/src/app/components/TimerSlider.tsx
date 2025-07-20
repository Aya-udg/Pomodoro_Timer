import React from "react";
import { Slider } from "@/app/components/ui/slider";
import { MyTimer } from "@/app/types/index";

type Props = {
  timerSettings: MyTimer;
  setTimerSettings: (timer: MyTimer) => void;
};

export default function TimerSlider({
  timerSettings,
  setTimerSettings,
}: Props) {
  return (
    <>
      <div className="w-96 flex justify-center items-center mb-5">
        <label className="block mb-2 text-sm font-medium">
          作業時間：
          {timerSettings.workTime / 60}分
        </label>
        <Slider
          value={[timerSettings.workTime / 60]}
          defaultValue={[timerSettings.workTime / 60]}
          onValueChange={(v) =>
            setTimerSettings({ ...timerSettings, workTime: v[0] * 60 })
          }
          max={60}
          step={1}
        />
      </div>
      <div className="w-96 flex justify-center items-center mb-5">
        <label className="block mb-2 text-sm font-medium">
          休憩時間：{timerSettings.breakTime / 60}分
        </label>
        <Slider
          value={[timerSettings.breakTime / 60]}
          defaultValue={[timerSettings.breakTime / 60]}
          onValueChange={(v) =>
            setTimerSettings({ ...timerSettings, breakTime: v[0] * 60 })
          }
          max={30}
          step={1}
        />
      </div>
      <div className="w-96 flex justify-center items-center mb-5">
        <label className="block mb-2 text-sm font-medium">
          長い休憩時間：{timerSettings.longBreakTime / 60}分
        </label>
        <Slider
          value={[timerSettings.longBreakTime / 60]}
          defaultValue={[timerSettings.longBreakTime / 60]}
          onValueChange={(v) => {
            setTimerSettings({ ...timerSettings, longBreakTime: v[0] * 60 });
          }}
          max={60}
          step={1}
        />
      </div>
    </>
  );
}
