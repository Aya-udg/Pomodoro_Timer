import useSound from "use-sound";

export const useAlarmSound  = () => {
  // const [play, { stop }] = useSound("/sounds/fanfare.mp3");
  const [play] = useSound("/sounds/cuckoo_clock.mp3");

  return play;
};
