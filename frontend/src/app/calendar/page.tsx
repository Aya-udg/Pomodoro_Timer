import MyCalendar from "@/app/components/MyCalendar";
import { ScheduleProvider } from "@/context/EventContext";
import Header from "@/app/components/Header";

export default function CalendarPage() {
  return (
    <>
      <Header />
      <main className="pt-10 sm:pt-30">
        <h1 className="text-center text-xl font-bold p-4">📅スケジュール📅</h1>
        <ScheduleProvider>
          <MyCalendar />
        </ScheduleProvider>
      </main>
    </>
  );
}
