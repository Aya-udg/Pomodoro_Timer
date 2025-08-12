"use client";
import Header from "../components/Header";
import { getStudyHistoryDay } from "@/lib/api/studyHistory";
import ChartClient from "@/app/components/ChartClient";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function app() {
  const router = useRouter();
  const [studydata, setStudydata] = useState(null);

  useEffect(() => {
    const fecthData = async () => {
      const res = await getStudyHistoryDay();
      const result = await res.json();
      console.log(result);
      if (res.status === 401) {
        if (result.error === "トークンの有効期限切れです") {
          toast.error(result.erro);
          setTimeout(() => {
            router.push("/login");
          }, 1500);
        } else if (result.error === "ユーザーが見つかりません") {
          toast.error("ログインしてください");
          setTimeout(() => {
            router.push("/login");
          }, 1500);
        }
      } else {
        setStudydata(result.data);
      }
    };
    fecthData();
  }, []);

  return (
    <>
      <Toaster />
      <Header />
      {studydata ? <ChartClient studydata={studydata} /> : null}
    </>
  );
}
