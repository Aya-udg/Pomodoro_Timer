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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Inputs = z.object({
  email: z.string(),
  password: z
    .string()
    .min(6, { message: "6文字以上で入力してください" })
    .max(15, { message: "15文字以下で入力してください" }),
  comment: z.string(),
});

type FormValues = z.infer<typeof Inputs>;

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(Inputs),
  });

  const onSubmit: SubmitHandler<FormValues> = (d) => console.log(d);

  return (
    <div className="bg-gradient-to-b from-slate-50 from- via-slate-50 via- to-slate-100 min-h-screen">
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
