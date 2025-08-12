import { Chat, ChatHistory } from "@/app/types/index";

type props = {
  chats: ChatHistory[];
};
export default function Posts({ chats }: props) {
  return (
    <section className="flex justify-center items-center flex-col">
      <p>
        {chats?.map((chat) => (
          <ul>
            <p className="text-right">{chat.message}</p>
            <li className="mb-10">{chat.response}</li>
          </ul>
        ))}
      </p>
    </section>
  );
}
