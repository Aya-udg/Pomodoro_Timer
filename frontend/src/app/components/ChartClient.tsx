"use client";
import { useState } from "react";
import { SimpleLineChart, TwoLevelPieChart } from "@/app/components/Chart";
import { StudyHistory } from "@/app/types/index";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

export default function app({ studydata }: { studydata: StudyHistory[] }) {
  const [studyHistory, setstudyHistory] = useState<StudyHistory[]>(studydata);
  //  選択した日
  const [choiceDay, setChoiceDay] = useState<Date>(new Date());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectday = new Date(e.target.value);
    setChoiceDay(selectday);
  };
  console.log(studyHistory);

  // ユーザーが選択した日の1週間前の日付を取得
  const oneWeekAgo = new Date(choiceDay);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  // 今週の勉強時間
  const weekStudyHistory = studyHistory.filter((v) => {
    const date = new Date(v.date);
    return oneWeekAgo <= date && date <= choiceDay;
  });
  const data = weekStudyHistory.reduce((sum, v) => sum + v.duration, 0);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>日付の設定</DropdownMenuTrigger>
        <DropdownMenuContent>
          <p>開始日を選んでください</p>
          <input type="date" onChange={handleChange} />
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex">
        <div className="flex flex-col font-mono bg-white border border-gray-200 shadow-2xs rounded-xl p-4 md:p-5 ml-5 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
          <p className="text-center">週の集中時間</p>
          <p className="text-2xl text-center text-blue-700">
            {Math.floor(data / 3600)}時間{Math.floor(data / 60) % 60}分
          </p>
        </div>
        <div className="flex flex-col font-mono bg-white border border-gray-200 shadow-2xs rounded-xl p-4 md:p-5 ml-5 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
          <p className="text-center">月の集中時間</p>
          <p className="text-2xl text-center text-blue-700 ">
            {Math.floor(data / 3600)}時間{Math.floor(data / 60) % 60}分
          </p>
        </div>
      </div>
      <div className="flex">
        {studyHistory && (
          <SimpleLineChart
            oneWeekAgo={oneWeekAgo}
            choiceDay={choiceDay}
            studydata={studyHistory}
          />
        )}
        {studyHistory && <TwoLevelPieChart />}
      </div>
    </>
  );
}
