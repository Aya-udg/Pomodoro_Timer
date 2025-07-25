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

export default function app() {
  return (
    <div className="w-full flex items-center justify-cente max-w-sm">
      <Card className="w-full">
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
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    パスワードをお忘れの方
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            ログイン
          </Button>
          <Button variant="outline" className="w-full">
            新規会員登録
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
