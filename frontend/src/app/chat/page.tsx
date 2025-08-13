import PostForm from "@/app/components/PostForm";
import Posts from "@/app/components/Posts";
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
      <div className="pt-25">
        <h1 className="text-center text-5xl">メッセージ</h1>
        <p>投稿一覧</p>
        <div className="flex justify-center">
          <PostForm></PostForm>
        </div>
      </div>
    </>
  );
}
