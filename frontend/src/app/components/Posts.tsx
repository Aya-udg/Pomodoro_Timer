import { Chat, ChatHistory } from "@/app/types/index";

type props = {
  chats: ChatHistory[];
};

export default function Posts({ chats }: props) {
  // 新しいチャットを下に表示
  const reversChats = [...chats].reverse();

  return (
    <section className="flex justify-center items-center flex-col">
      <div>
        {reversChats?.map((chat) => (
          <div key={chat.id}>
            <div className="text-right my-15">
              <p className="border-amber-100 bg-amber-100 rounded-3xl inline-block py-4 px-8">
                {chat.message}
              </p>
            </div>
            <div className="flex border-b pb-8">
              <div>画像</div>
              <p className="">{chat.response}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
