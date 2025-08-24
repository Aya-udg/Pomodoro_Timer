import MyCalendar from "@/app/components/MyCalendar";
import { ScheduleProvider } from "@/context/EventContext";
import Header from "@/app/components/Header";

export default function CalendarPage() {
  return (
    <>
      <Header />
      <div className="h-screen">
        <main className="pt-10 sm:pt-30">
          <h1 className="text-center text-xl font-bold p-4">カレンダー</h1>
          <div className="flex justify-center">
            <ScheduleProvider>
              <div className="flex justify-center lg:w-4/5">
                <MyCalendar />
              </div>
            </ScheduleProvider>
          </div>
        </main>
      </div>
    </>
  );
}
