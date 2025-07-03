import useSound from "use-sound";

export const useAlarmSound = () => {
  // const [play, { stop }] = useSound("/sounds/fanfare.mp3");
  const [cuckooClockPlay] = useSound("/sounds/cuckoo_clock.mp3");
  const [fanfarePlay] = useSound("/sounds/cuckoo_clock.mp3");

  return { cuckooClockPlay, fanfarePlay };
};
