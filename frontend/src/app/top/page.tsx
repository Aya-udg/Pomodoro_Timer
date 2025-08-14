import Header from "@/app/components/Header";

export default function app() {
  return (
    <>
      <Header />

      <div className="mt-20">
        <h1>TOPページ</h1>
        <p>タイマー、カレンダーは会員登録なしで使用できます</p>
        <p>
          ※勉強時間の記録・スケジュールの登録・AIとのチャットは非会員の方は利用できません
        </p>
      </div>
    </>
  );
}
