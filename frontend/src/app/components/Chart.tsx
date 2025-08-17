import {
  CartesianGrid,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  LabelList,
} from "recharts";
import { StudyHistory } from "@/app/types/index";
import Image from "next/image";

type Props = {
  studydata: StudyHistory[];
  choiceDay: Date;
  oneWeekAgo: Date;
};

export function SimpleLineChart({ choiceDay, studydata, oneWeekAgo }: Props) {
  // 1週間分のデータをグラフ化
  const data = studydata.flatMap((v) => {
    const targetDate = new Date(v.date);
    if (oneWeekAgo <= targetDate) {
      if (choiceDay >= targetDate) {
        return [{ name: v.date, 集中時間: v.duration / 60 }];
      }
    }
  });

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex justify-center mb-10">
          <div className="lg:w-[150px] w-[100px]">
            <Image src="/ai_icon.png" alt="logo" width={150} height={150} />
          </div>
          <div className="self-center border-amber-100 bg-gray-100 rounded-3xl px-8 py-4">
            <h1 className="text-center">{oneWeekAgo.toLocaleDateString()}</h1>
            <h1 className="text-center">{choiceDay.toLocaleDateString()}</h1>
            <p>の勉強時間を表示しているよ</p>
          </div>
        </div>
        <div className="w-full h-full flex justify-center">
          <ResponsiveContainer width="80%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value: number) =>
                  `${
                    Math.floor(value / 60)
                      ? `${Math.floor(value / 60)}時間`
                      : ""
                  }${value % 60} 分`
                }
              />
              <CartesianGrid stroke="#CCC" strokeDasharray="5 5" />
              <Bar dataKey="集中時間" fill="#1564b3" barSize={40}>
                <LabelList position="top" dataKey="集中時間" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const data02 = [
  { name: "A1", value: 100 },
  { name: "A2", value: 300 },
  { name: "B1", value: 100 },
  { name: "B2", value: 80 },
  { name: "B3", value: 40 },
  { name: "B4", value: 30 },
  { name: "B5", value: 50 },
  { name: "C1", value: 100 },
  { name: "C2", value: 200 },
  { name: "D1", value: 150 },
  { name: "D2", value: 50 },
];

export const TwoLevelPieChart = () => {
  return (
    <ResponsiveContainer width="80%" height={400}>
      <PieChart>
        <Pie data={data01} dataKey="value" outerRadius="60%" fill="#8884d8" />
        <Pie
          data={data02}
          dataKey="value"
          innerRadius="70%"
          outerRadius="80%"
          fill="#82ca9d"
          paddingAngle={5}
          label={{ fontSize: "1.5em" }}
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};
