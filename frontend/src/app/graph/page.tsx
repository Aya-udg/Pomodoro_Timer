"use client";
import { useEffect, useState } from "react";
import { SimpleLineChart, TwoLevelPieChart } from "@/app/components/Chart";
import { getStudyHistoryDay } from "../lib/getStudyHistory";
import { StudyHistory } from "@/app/types/index";

export default function app() {
  const [studyHistory, setstudyHistory] = useState<StudyHistory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const date = await getStudyHistoryDay();
      setstudyHistory(date);
    };
    fetchData();
  }, []);

  return (
    <>
      <input type="date" name="birthday" />
      <select name="example">
        <option>選択肢のサンプル1</option>
        <option>選択肢のサンプル2</option>
        <option>選択肢のサンプル3</option>
      </select>

      <div className="flex">
        {studyHistory && <SimpleLineChart studydata={studyHistory} />}
        {studyHistory && <TwoLevelPieChart />}
      </div>
    </>
  );
}
