import { create } from "zustand";

// グロ－バルステート
type UserState = {
  username: string | null;
  setUsername: (name: string) => void;
};
export const useUserStore = create<UserState>((set) => ({
  username: "",
  setUsername: (name) => set({ username: name })
}));
