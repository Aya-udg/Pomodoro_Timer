import Link from "next/link";

export default function Header() {
  return (
    <header className="max-w-400 relative">
      <div className="bg-amber-200 p-3 flex justify-between fixed top-0 right-0 left-0">
        <h1 className="text-left">ヘッダーです</h1>
        <p>こんにちは：さん</p>
        <nav>
          <Link className="mx-10" href="/">
            タイマー
          </Link>
          <Link className="mx-10" href="/graph">
            グラフ
          </Link>
          <Link className="mx-10" href="/login">
            ログイン
          </Link>
        </nav>
      </div>
    </header>
  );
}
