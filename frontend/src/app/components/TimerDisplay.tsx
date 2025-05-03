import React from "react";

interface Props {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  resume: () => void;
  restart: () => void;
}

export const TimerDisplay = ({
  minutes,
  seconds,
  isRunning,
  start,
  pause,
  resume,
  restart,
}: Props) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>react-timer-hook</h1>
      <p>ポモドーロ</p>
      <div style={{ fontSize: "100px" }}>
        <span>{minutes}</span>:
        <span>{seconds % 60 < 10 ? `0${seconds % 60}` : seconds}</span>
      </div>
      <p>{isRunning ? "動作中" : "停止中"}</p>
      <button className="btn-base btn-blue" onClick={start}>
        開始
      </button>
      <button className="btn-base btn-black" onClick={pause}>
        一時停止
      </button>
      <button className="btn-base btn-black" onClick={resume}>
        再開
      </button>
      <button className="btn-base btn-black" onClick={restart}>
        リスタート
      </button>
    </div>
  );
};
