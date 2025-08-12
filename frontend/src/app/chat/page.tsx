import PostForm from "@/app/components/PostForm";
import Posts from "@/app/components/Posts";
import Header from "@/app/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="pt-25">
        <h1 className="text-center text-5xl">メッセージ</h1>
        <p>投稿一覧</p>
        <Posts></Posts>
        <div className="flex justify-center">
          <PostForm></PostForm>
        </div>
      </div>
    </>
  );
}
