"use client";
import { useState, useEffect } from "react";
import { SimpleLineChart } from "@/app/components/Chart";
import { StudyHistory } from "@/app/types/index";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { getStudyHistoryDay } from "@/lib/api/studyHistory";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/app/components/ui/button";

export default function ChartClient() {
  const [studydata, setStudydata] = useState<StudyHistory[]>([]);

  //  選択した日
  const [choiceDay, setChoiceDay] = useState<Date>(new Date());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectday = new Date(e.target.value);
    setChoiceDay(selectday);
  };

  const router = useRouter();

  // トークンの有効期限が切れたときに再ログインを促す
  useEffect(() => {
    const fecthData = async () => {
      const res = await getStudyHistoryDay();
      if (res.status === 401) {
        toast.error(res.error);
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
      setStudydata(res.data);
    };
    fecthData();
  }, []);

  // ユーザーが選択した日の1週間前の日付を取得
  const oneWeekAgo = new Date(choiceDay);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  // 今週の勉強時間
  const weekStudyHistory = studydata.filter((v) => {
    const date = new Date(v.date);
    return oneWeekAgo <= date && date <= choiceDay;
  });
  const weekData = weekStudyHistory.reduce((sum, v) => sum + v.duration, 0);

  const totalData = studydata.reduce((sum, v) => sum + v.duration, 0);

  return (
    <>
      <Toaster />
      <div className="pt-10 sm:pt-30">
        <div className="flex justify-center mb-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">日付の設定</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <p>見たい日を選んでください</p>
              <input type="date" onChange={handleChange} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex justify-center mb-10">
          <div className="flex flex-col font-mono bg-white border border-gray-200 shadow-2xs rounded-xl p-4 md:p-5 ml-5 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
            <p className="text-center">週の集中時間</p>
            <p className="text-2xl text-center text-blue-700">
              {Math.floor(weekData / 3600)}時間{Math.floor(weekData / 60) % 60}
              分
            </p>
          </div>
          <div className="flex flex-col font-mono bg-white border border-gray-200 shadow-2xs rounded-xl p-4 md:p-5 ml-5 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
            <p className="text-center">累計集中時間</p>
            <p className="text-2xl text-center text-blue-700 ">
              {Math.floor(totalData / 3600)}時間
              {Math.floor(totalData / 60) % 60}分
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          {studydata && (
            <SimpleLineChart
              oneWeekAgo={oneWeekAgo}
              choiceDay={choiceDay}
              studydata={studydata}
            />
          )}
        </div>
      </div>
    </>
  );
}
