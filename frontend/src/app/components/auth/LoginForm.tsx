"use client";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { Inputs, FormValues } from "@/app/types/index";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUserStore } from "../userStore";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(Inputs),
  });

  const { setUsername } = useUserStore();

  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const res = await fetch("/api/login", {
      method: "POST",
      // URLエンコード形式で送る
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data),
    });
    const result = await res.json();
    // ログイン成功
    setUsername(result.data.username);
    if (res.ok) {
      toast.success("ログインしました！ホーム画面に戻ります");
      setTimeout(() => {
        router.push("/");
      }, 1800);
    } else {
      toast.error("認証失敗しましたた");
    }
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 from- via-slate-50 via- to-slate-100  min-h-screen">
      <div>
        <Toaster />
      </div>
      <div className="flex  items-center mx-auto justify-center max-w-sm pt-30">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-xl">ログイン</CardTitle>
              <CardDescription>
                ログインするにはユーザーネームとパスワードを入力してください
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="username">ユーザーネーム</Label>
                  <Input
                    id="username"
                    placeholder="gest"
                    {...register("username")}
                  />
                  {errors.username?.message && (
                    <p className="text-red-600">{errors.username.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">パスワード</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      パスワードをお忘れの方
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="6文字以上15文字以下"
                    {...register("password")}
                  />
                  {errors.password?.message && (
                    <p className="text-red-600">{errors.password.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-600"
              >
                ログイン
              </Button>
              <Link className="w-full text-center" href="/signup">
                新規会員登録
              </Link>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
