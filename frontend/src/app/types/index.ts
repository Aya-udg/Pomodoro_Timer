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
  username: string;
  memo?: string;
  tag?: string;
};
export type event = {
  id: string;
  title: string;
};

export type TodoFormData = {
  start: string;
  end: string;
  title: string;
  memo?: string;
  completed: boolean;
  timer: number;
  color: string;
};

export type UpdateTodoFormData = TodoFormData & {
  id: string;
  description: string;
};

export type Schedule = {
  id: string;
  title: string;
  start: string;
  end: string;
  completed: boolean;
  description: string;
  timer: number;
  memo?: string;
  color: string;
};

export const Inputs = z.object({
  username: z
    .string()
    .min(1, { error: "名前を入力して下さい" })
    .max(15, { error: "15文字以下で入力してください" }),
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
