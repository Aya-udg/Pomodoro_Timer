"use client";

import dynamic from "next/dynamic";
import toast, { Toaster } from "react-hot-toast";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarOptions } from "@fullcalendar/core"; // 型をインポート
import { useEffect, useState } from "react";
import AddEventDialog from "./AddEventDialog";
import { getSchedule } from "@/lib/api/calendar";
import { useSchedule } from "@/context/EventContext";
import { Schedule } from "@/app/types/index";
import { useRouter } from "next/navigation";

// FullCalendar を動的に読み込む
const FullCalendar = dynamic(
  () => import("@fullcalendar/react").then((mod) => mod.default as any),
  {
    ssr: false,
  }
);

export default function MyCalendar() {
  // ダイアログの表示の切り替え
  const [open, setOpen] = useState(false);
  // 予定一覧の保持
  const { events, setEvents, setSelectedEvent, setSelectedDate } =
    useSchedule();

  const router = useRouter();

  const fetchData = async () => {
    const res = await getSchedule();
    if (res.status === 401) {
      if (res.error === "トークンの有効期限切れです") {
        toast.error(res.error);
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    }
    if (res.data) {
      setEvents(
        res.data.map((item: Schedule) => ({
          title: item.title,
          start: item.start,
          end: item.end,
          id: item.id,
          color: item.color,
          extendedProps: {
            timer: item.timer,
            completed: item.completed,
            description: item.description,
            memo: item.memo,
          },
        }))
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    locale: "ja",
    events: events,
    height: "auto",
    businessHours: true,

    dateClick: (e) => {
      // クリックした日付の文字列が入る
      setSelectedEvent(null);
      setSelectedDate(e.dateStr);
      setOpen(true);
    },

    eventClick: (e) => {
      const event = e.event;
      const selected = {
        id: event.id,
        title: event.title,
        description: event.extendedProps.description,
        start: event.startStr,
        end: event.endStr,
        color: event.backgroundColor,
        completed: event.extendedProps.completed,
        timer: event.extendedProps.timer,
        memo: event.extendedProps.memo,
      };
      setSelectedEvent(selected);
      setSelectedDate(selected.start);
      setOpen(true);
    },
  };

  const handleSuccess = (msg: string) => {
    toast.success(msg);
    fetchData();
  };

  const handleError = (msg: string) => {
    toast.error(msg);
  };

  return (
    <div className="p-4">
      <Toaster />
      <FullCalendar {...(calendarOptions as any)} />
      <AddEventDialog
        onSuccess={handleSuccess}
        onError={handleError}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
}
