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
          <ul key={chat.id}>
            <p className="text-right">{chat.message}</p>
            <li className="mb-10">{chat.response}</li>
          </ul>
        ))}
      </div>
    </section>
  );
}
