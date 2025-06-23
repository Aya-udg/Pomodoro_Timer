"use client";

import { CartesianGrid, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "A", value: 400 },
  { name: "B", value: 200 },
  { name: "C", value: 300 },
  { name: "D", value: 350 },
  { name: "E", value: 300 },
];

export default function SimpleLineChart() {
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
