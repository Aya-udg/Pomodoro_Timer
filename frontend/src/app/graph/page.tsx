import Header from "../components/Header";
import { getStudyHistoryDay } from "../lib/getStudyHistory";
import ChartClient from "@/app/components/ChartClient";

export default async function app() {
  const studydata = await getStudyHistoryDay();

  return (
    <>
      <Header />
      <ChartClient studydata={studydata} />
    </>
  );
}
