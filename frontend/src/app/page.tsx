import Link from "next/link";
import Image from "next/image";

export default function app() {
  return (
    <>
      <main className="h-screen bg-gradient-to-t from-blue-200">
        <div className="mt-20">
          <div className="">
            <h1 className="font-dotgothic text-3xl text-center">
              キャラクターと一緒に成長するアプリ
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 place-items-center m-5">
            <Image src="/sample.png" alt="logo" width={300} height={300} />
            <Image src="/sample.png" alt="logo" width={300} height={300} />
            <Image src="/sample.png" alt="logo" width={300} height={300} />
          </div>
          <div className="flex justify-center">
            <button className="group relative w-35 h-12 overflow-hidden rounded-md bg-blue-500 px-6 text-neutral-50 transition">
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
