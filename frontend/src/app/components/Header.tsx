import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-amber-200 p-3 flex justify-between max-w-400">
      <h1 className="text-left">ヘッダーです</h1>
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
    </header>
  );
}
