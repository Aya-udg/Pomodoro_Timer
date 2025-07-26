import { z } from "zod";

export type MyTimer = {
  workTime: number;
  breakTime: number;
  longBreakTime: number;
};

export type StudyHistory = {
  id?: number;
  date: string;
  duration: number;
  memo?: string;
  tag?: string;
};

export const Inputs = z.object({
  email: z
    .string()
    .min(1, { error: "メールアドレスを入力してください" })
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      error: "メールアドレスの形式が正しくありません",
    }),
  password: z
    .string()
    .min(1, { error: "パスワードを入力してください" })
    .min(6, { error: "6文字以上で入力してください" })
    .max(15, { error: "15文字以下で入力してください" })
    .refine((val) => /[A-Z]/.test(val) && /[0-9]/.test(val), {
      error: "1文字以上の大文字アルファベットと数字を含ませてください",
    }),
});

 export type FormValues = z.infer<typeof Inputs>;
