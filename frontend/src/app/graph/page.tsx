import { cookies } from "next/headers";
import Header from "../components/Header";
import ChartClient from "@/app/components/ChartClient";
import { redirect } from "next/navigation";

export default async function app() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) redirect("/login");
  return (
    <div className="h-screen">
      <Header />
      <ChartClient />
    </div>
  );
}
