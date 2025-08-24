type Props = {
  hours: number;
  minutes: number;
  seconds: number;
  pause: () => void;
  resume: () => void;
  restart: () => void;
};

export const TimerDisplay = ({
  hours,
  minutes,
  seconds,
  resume,
  pause,
  restart,
}: Props) => {
  return (
    <div className="flex justify-center flex-col mt-15">
      <div className="text-center text-8xl mb-5">
        <span>{hours ? hours : "0"}</span>:<span>{minutes}</span>:
        <span>{seconds % 60 < 10 ? `0${seconds % 60}` : seconds}</span>
      </div>
      <div className="text-center">
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
