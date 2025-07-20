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

type Props = {
  studydata: StudyHistory[];
  choiceDay: Date;
};

export function SimpleLineChart({ choiceDay, studydata }: Props) {
  // ユーザーが選択した日の1週間前の日付を取得
  const oneWeekAgo = new Date(choiceDay);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const data = studydata.flatMap((v) => {
    const targetDate = new Date(v.date);
    if (oneWeekAgo <= targetDate) {
      if (choiceDay >= targetDate) {
        return [{ name: v.date, 集中時間: v.duration / 60 }];
      }
    }
  });

  console.log(studydata);
  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-center">{oneWeekAgo.toLocaleDateString()}</h1>
        <h1 className="text-center">{choiceDay.toLocaleDateString()}</h1>
        <BarChart width={400} height={400} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            formatter={(value: number) =>
              `${
                Math.floor(value / 60) ? `${Math.floor(value / 60)}時間` : ""
              }${value % 60} 分`
            }
          />
          <CartesianGrid stroke="#CCC" strokeDasharray="5 5" />
          <Bar dataKey="集中時間" fill="#1564b3" barSize={40}>
            <LabelList position="top" dataKey="集中時間" />
          </Bar>
        </BarChart>
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
