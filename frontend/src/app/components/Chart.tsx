import { useEffect, useState } from "react";
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
} from "recharts";


type props = {
  today: string;
};

const data = [
  { name: "A", value: 400 },
  { name: "B", value: 200 },
  { name: "C", value: 300 },
  { name: "D", value: 350 },
  { name: "E", value: 300 },
];

export function SimpleLineChart(today: props) {
  return (
    <BarChart width={400} height={400} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#CCC" strokeDasharray="5 5" />
      <Bar dataKey="value" stroke="#8884d8" barSize={30} />
    </BarChart>
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

export const TwoLevelPieChart = (today: props) => {
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
