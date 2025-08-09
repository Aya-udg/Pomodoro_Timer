import { useTimer } from "react-timer-hook";
import { useEffect, useState } from "react";
import { MyTimer } from "@/app/types/index";
import { StudyHistory } from "@/app/types/index";
import postStudyHistory from "@/lib/api/studyHistory";
import { useUserStore } from "@/app/components/userStore";

export const usePomodoroTimer = (
  { workTime, breakTime, longBreakTime }: MyTimer,
  cuckooClockPlay: () => void,
  fanfarePlay: () => void
) => {
  const [sessionCount, setSessionCount] = useState(0); // 4回でロング休憩
  const [timerType, setTimerType] = useState<"timer" | "break" | "longbreak">(
    "timer"
  ); //タイマーの状態
  const { username } = useUserStore();
  const getExpiryTime = (seconds: number) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + seconds);
    return time;
  };

  // 登録日
  const now = new Date();
  const date = now.toLocaleDateString();

  const { hours, seconds, minutes, isRunning, pause, resume, restart } =
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
  }, [workTime, breakTime, longBreakTime, restart, timerType]);

  // タイマー終了時の処理
  const endTimer = async () => {
    const posdate: StudyHistory = {
      date: date,
      duration: workTime,
      username: username!,
    };
    console.log("現在のタイマータイプ:", timerType, posdate);
    console.log("セッションカウント:", sessionCount);

    if (timerType === "timer") {
      fanfarePlay();
      const  newCount = sessionCount + 1;
      setSessionCount(newCount);
      console.log(posdate);
      // ユーザー登録していたらDBに保存
      username && postStudyHistory(posdate);

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
