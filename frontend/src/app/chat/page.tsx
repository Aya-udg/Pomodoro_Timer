import PostForm from "@/app/components/PostForm";
import Header from "@/app/components/Header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) redirect("/login");

  return (
    <>
      <Header />
      <div className="pt-10 sm:pt-30">
        <h1 className="text-center lg:text-5xl text-3xl">メッセージ</h1>
        <div className="flex justify-center">
          <PostForm></PostForm>
        </div>
      </div>
    </>
  );
}
