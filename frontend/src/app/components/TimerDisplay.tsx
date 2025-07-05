type Props = {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  pause: () => void;
  resume: () => void;
  restart: () => void;
};

export const TimerDisplay = ({
  minutes,
  seconds,
  isRunning,
  resume,
  pause,
  restart,
}: Props) => {
  return (
    <div className="flex justify-center flex-col mt-15">
      <div className="text-center text-8xl mb-5">
        <span>{minutes}</span>:
        <span>{seconds % 60 < 10 ? `0${seconds % 60}` : seconds}</span>
      </div>
      <div className="text-center">
        <p>{isRunning ? "動作中" : "停止中"}</p>
        <button className="btn-base btn-blue" onClick={resume}>
          開始
        </button>
        <button className="btn-base btn-black" onClick={pause}>
          一時停止
        </button>
        <button className="btn-base btn-red" onClick={restart}>
          リセット
        </button>
      </div>
    </div>
  );
};
