import useSound from "use-sound";

export const BoopButton = () => {
  const [play, { stop }] = useSound("/sounds/alarm.mp3");

  return (
    <>
      <button onClick={() => play()}> Boop! </button>
      <button onClick={() => stop()}>停止</button>
    </>
  );
};
