"use client";

import React, { createContext, useState, useContext } from "react";
import { Schedule } from "@/app/types/index";

type EventType = any;

// 登録・更新した予定を即座に変更させる用
type ScheduleContextType = {
  // イベント一覧
  events: EventType[];
  setEvents: React.Dispatch<React.SetStateAction<any[]>>;
  // 選択した予定
  selectedEvent: Schedule | null;
  setSelectedEvent: React.Dispatch<React.SetStateAction<Schedule | null>>;
  // 選択した日付
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
};

export const ScheduleContext = createContext<ScheduleContextType | null>(null);

export const ScheduleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Schedule | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("2025-01-01");

  return (
    <ScheduleContext
      value={{
        events,
        setEvents,
        selectedEvent,
        setSelectedEvent,
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </ScheduleContext>
  );
};

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (!context)
    throw new Error("useScheduleはScheduleProviderの中で使用してください");
  return context;
};
