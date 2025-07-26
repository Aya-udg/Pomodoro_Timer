"use client";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { log } from "console";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

type Inputs = {
  email: string;
  password: string;
  comment: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (d) => console.log(d);

  return (
    <div className="flex  items-center mx-auto justify-center max-w-sm  min-h-screen">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>ログイン</CardTitle>
            <CardDescription>
              ログインするにはパスワードとメールアドレスを入力してください
            </CardDescription>
            <CardAction>
              <Button variant="link">サインアップ</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  {...register("email", {
                    required: "メールアドレスを入力してください",
                  })}
                />
                {errors.email?.message && (
                  <p className="text-red-600">{errors.email.message}</p>
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
                  {...register("password", {
                    minLength: {
                      value: 6,
                      message: "6文字以上で入力してください",
                    },
                    maxLength: {
                      value: 15,
                      message: "15文字以下で入力してください",
                    },
                    required: "パスワードを入力してください",
                  })}
                />
                {errors.comment?.message && (
                  <p className="text-red-600">{errors.comment.message}</p>
                )}
                {errors.password?.message && (
                  <p className="text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              ログイン
            </Button>
            <Link className="w-full" href="/signup">
              新規会員登録
            </Link>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
