import useSound from "use-sound";

export const BoopButton = () => {
  // const [play, { stop }] = useSound("/sounds/fanfare.mp3");
  const [play, { stop }] = useSound("/sounds/cuckoo_clock.mp3");

  return (
    <>
      <button onClick={() => play()}> 作業終了 </button>
    </>
  );
};
