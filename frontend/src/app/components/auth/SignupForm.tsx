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
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import { Inputs, FormValues } from "@/app/types/index";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(Inputs),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (res.ok) {
      toast.success("ユーザー登録が完了しました！ログインしてください");
    } else {
      toast.error(`ユーザー登録に失敗しました。${result.data.detail}`);
    }
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 from- via-slate-50 via- to-slate-100 min-h-screen">
      <Toaster />
      <div className="flex  items-center mx-auto justify-center max-w-sm pt-30">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">新規会員登録</CardTitle>
              <CardDescription></CardDescription>
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
                className="w-full bg-teal-500 hover:bg-teal-600"
              >
                会員登録
              </Button>
              <Link className="w-full text-center" href="/login">
                アカウントをお持ちの方
              </Link>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
