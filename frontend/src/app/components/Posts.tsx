import { ChatHistory } from "@/app/types/index";
import Image from "next/image";

type props = {
  chats: ChatHistory[];
};

export default function Posts({ chats }: props) {
  // 新しいチャットを下に表示
  const reversChats = [...chats].reverse();

  return (
    <section className="flex justify-center items-center flex-col md:w-full">
      <div>
        {reversChats?.map((chat) => (
          <div key={chat.id}>
            <div className="text-right my-15">
              <p className="border-amber-100 bg-amber-100 rounded-3xl inline-block py-4 px-8">
                {chat.message}
              </p>
            </div>
            <div className="flex border-b pb-8 items-center">
              <Image src="/ai_icon.png" alt="logo" width={100} height={100} />
              <p className="pl-5 border-amber-100 bg-gray-100 rounded-3xl inline-block py-4 px-8">
                {chat.response}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
