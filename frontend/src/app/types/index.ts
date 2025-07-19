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
