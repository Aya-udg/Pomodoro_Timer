import MyCalendar from "@/app/components/MyCalendar";
import { ScheduleProvider } from "@/context/EventContext";
export default function CalendarPage() {
  return (
    <main>
      <h1 className="text-center text-xl font-bold p-4">📅スケジュール📅</h1>
      <ScheduleProvider>
        <MyCalendar />
      </ScheduleProvider>
    </main>
  );
}
