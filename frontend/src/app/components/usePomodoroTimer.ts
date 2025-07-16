import { useTimer } from "react-timer-hook";
import { useEffect, useState } from "react";
import { MyTimer } from "@/app/types/index";

export const usePomodoroTimer = (
  { workTime, breakTime, longBreakTime }: MyTimer,
  cuckooClockPlay: () => void,
  fanfarePlay: () => void
) => {
  const [sessionCount, setSessionCount] = useState(0); // 4回でロング休憩
  const [timerType, setTimerType] = useState<"timer" | "break" | "longbreak">(
    "timer"
  ); //タイマーの状態

  const getExpiryTime = (seconds: number) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + seconds);
    return time;
  };

  const {hours, seconds, minutes, isRunning, pause, resume, restart } =
    useTimer({
      expiryTimestamp: getExpiryTime(workTime),
      autoStart: false,
      onExpire: () => {
        endTimer();
        // onExpire?.(); // onExpire が undefined じゃなければ
      },
      interval: 1000,
    });

  // タイマーの初期表示をデータベースの値にする
  useEffect(() => {
    let time;
    if (timerType === "timer") time = workTime;
    else if (timerType === "break") time = breakTime;
    else time = longBreakTime;
    restart(getExpiryTime(time), false);
  }, [workTime, breakTime, longBreakTime]);

  // タイマー終了時の処理
  const endTimer = () => {
    console.log("現在のタイマータイプ:", timerType);
    console.log("セッションカウント:", sessionCount);

    if (timerType === "timer") {
      fanfarePlay();
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
      cuckooClockPlay();
      // 休憩が終わったら、通常のタイマーに戻す
      restart(getExpiryTime(workTime), false);
      setTimerType("timer");
      console.log("通常のタイマーに戻しました");
    }
  };

  return {
    hours,
    seconds,
    minutes,
    isRunning,
    pause,
    resume,
    restart: () => {
      setSessionCount(0);
      setTimerType("timer");
      restart(getExpiryTime(workTime), false);
    },
  };
};
