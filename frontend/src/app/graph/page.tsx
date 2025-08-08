import Header from "../components/Header";
import { getStudyHistoryDay } from "@/lib/getStudyHistory";
import ChartClient from "@/app/components/ChartClient";
import { useUserStore } from "@/app/components/userStore";

export default async function app() {
  // const { username } = useUserStore();
  // const studydata = await getStudyHistoryDay(username);

  return (
    <>
      <Header />
      <ChartClient studydata={studydata} />
    </>
  );
}
