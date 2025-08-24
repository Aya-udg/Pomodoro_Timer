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

type LoginState ={
  loading:boolean
  setLoading:(loadibg:boolean) => void
}

export const useLoginStore = create<LoginState>((set)=>({
  loading:true,
  setLoading:(loading) => set({loading:loading})
}))