"use client";
import { useEffect, useState } from "react";
import { SimpleLineChart, TwoLevelPieChart } from "@/app/components/Chart";
import { getStudyHistoryDay } from "../lib/getStudyHistory";
import { StudyHistory } from "@/app/types/index";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

export default function app() {
  const [studyHistory, setstudyHistory] = useState<StudyHistory[]>([]);
  //  選択した日
  const [choiceDay, setChoiceDay] = useState<Date>(new Date());

  useEffect(() => {
    const fetchData = async () => {
      const date = await getStudyHistoryDay();
      setstudyHistory(date);
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectday = new Date(e.target.value);
    setChoiceDay(selectday);
  };

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
        {studyHistory && (
          <SimpleLineChart choiceDay={choiceDay} studydata={studyHistory} />
        )}
        {studyHistory && <TwoLevelPieChart />}
      </div>
    </>
  );
}
