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
      const data = await getStudyHistoryDay();
      if (!data) {
        toast.error("ログインしてください");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        setStudydata(data.data);
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
