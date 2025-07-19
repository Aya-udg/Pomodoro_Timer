"use client";
import { SimpleLineChart, TwoLevelPieChart } from "@/app/components/Chart";

export default function app() {
  const now = new Date();
  const today = now.toLocaleDateString();

  return (
    <>
      <input type="date" name="birthday" />
      <select name="example">
        <option>選択肢のサンプル1</option>
        <option>選択肢のサンプル2</option>
        <option>選択肢のサンプル3</option>
      </select>
      <p>{today}</p>
      <div className="flex">
        <SimpleLineChart today={today} />
        <TwoLevelPieChart today={today} />
      </div>
      <p>うに</p>
    </>
  );
}
