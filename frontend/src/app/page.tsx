import Link from "next/link";
import Image from "next/image";

export default function app() {
  return (
    <>
      <main className="h-full bg-[#FAF9F8]">
        <div className="pt-20">
          <div className="">
            <h1 className="font-dotgothic text-3xl text-center">
              キャラクターと一緒に成長するアプリ
            </h1>
          </div>
          <div className="flex justify-center items-center mb-15">
            <Image
              src="/ai_icon.gif"
              alt="logo"
              width={300}
              height={300}
              unoptimized
            />
            <p className="font-dotgothic text-2xl text-center ml-10 border-amber-200 bg-amber-200 rounded-3xl inline-block py-4 px-8">
              Hello!
            </p>
          </div>
          <div className="flex justify-center">
            <button className="group relative w-35 h-12 overflow-hidden rounded-md bg-blue-500 px-6 text-neutral-50 transition mb-20">
              <Link href="/top">
                <span className="font-dotgothic">使ってみる</span>
                <div className="absolute inset-0 h-full w-0 bg-white/30 transition-[width] group-hover:w-full"></div>
              </Link>
            </button>
          </div>
          <div className="flex justify-center mb-30">
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 place
          -items-center"
            >
              <div className="m-10">
                <p className="text-center heading-text">TOPページ</p>
                <Image src="/top.png" alt="logo" width={500} height={500} />
                <p className="text-center">ポモドーロタイマーページです</p>
                <p className="text-center">
                  集中時間・休憩時間を自分好みに設定できます
                </p>
              </div>
              <div className="m-10">
                <p className="text-center heading-text">カレンダー</p>
                <Image
                  src="/calendar.png"
                  alt="logo"
                  width={500}
                  height={500}
                />
                <p className="text-center">
                  予定を自由に登録できます（予定登録機能は会員限定）
                </p>
                <p className="text-center">
                  表示色を変更できるので区別分けがしやすい！
                </p>
              </div>
            </div>
          </div>
          <h2 className="text-center font-dotgothic text-2xl my-10">
            会員限定コンテンツ
          </h2>
          <div className="flex justify-center">
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 place
          -items-center"
            >
              <div className="m-10">
                <p className="text-center heading-text">グラフページ</p>
                <Image src="/graph.png" alt="logo" width={500} height={500} />
                <p className="text-center">勉強時間をグラフ化</p>
              </div>
              <div className="m-10">
                <p className="text-center heading-text">チャットページ</p>
                <Image src="/chat.png" alt="logo" width={500} height={500} />
                <p className="text-center">
                  キャラクターとおしゃべりができます
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="group relative w-35 h-12 overflow-hidden rounded-md bg-blue-500 px-6 text-neutral-50 transition mb-20">
              <Link href="/top">
                <span className="font-dotgothic">使ってみる</span>
                <div className="absolute inset-0 h-full w-0 bg-white/30 transition-[width] group-hover:w-full"></div>
              </Link>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
