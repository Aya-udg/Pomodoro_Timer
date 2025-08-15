# PomodoroTimer

## URL


## 開発背景
未経験からエンジニアを目指すにあたり、個人開発をすることにしました。
勉強時にポモドーロ・テクニックを活用していたこと、また無料で利用できる既存サービスで勉強時間をグラフ化・カレンダーでTODOの管理ができるものが見つからず、作成しました。

## 使用技術一覧
言語
<img src="https://img.shields.io/badge/-TypeScript-007ACC.svg?logo=typescript&style=flat"><img src="https://img.shields.io/badge/-Python-F9DC3E.svg?logo=python&style=flat">
ライブラリ・フレームワーク
<img src="https://img.shields.io/badge/-React-555.svg?logo=react&style=flat"><img src="https://img.shields.io/badge/-Nextjs-000000.svg?logo=Nextjs&style=flat"><img src="https://img.shields.io/badge/-fastapi-009688.svg?logo=fastapi&style=flat"><img src="https://img.shields.io/badge/-pydantic-E92063.svg?logo=pydantic&style=flat">
ミドルウェア
<img src="https://img.shields.io/badge/-PostgreSQL-336791.svg?logo=postgresql&style=flat">
その他
<img src="https://img.shields.io/badge/-Docker-EEE.svg?logo=docker&style=flat">

## 主な機能

タイマーページ（会員登録なしで利用可）
デフォルトで集中時間25分・小休憩5分・休憩20分になっています。
必要に応じて時間変更が可能です。

ログイン・新規会員登録ページ
どちらもバリデーションが表示されるようになっており、エラーの内容が分かりやすくなっています。

グラフページ
ユーザーが選んだ日から1週間の勉強時間をグラフ表示することが可能です。
また今までの勉強時間の累計もデフォルトで表示されます。

カレンダーページ
予定を登録することが可能です。
表示色を変更することができるので、カテゴリー別に登録することが可能です。

チャットページ
ＡＩとのチャットを利用することができます。キャラクターのイラストは自作しました。

カレンダーページの予定登録・グラフ・チャットはログインユーザーのみ利用可能です。
非ログインユーザーが予定登録・ページへのアクセスを試みた場合は、ログインページにリダイレクトされます。

またトークンの有効期限が切れた場合も再ログインを促します。

## ER図


## 環境変数

| 変数名   | 役割 | 
| ------ | ---- |
| POSTGRES_USER | PostgreSQLのユーザー名  |
| POSTGRES_PASSWORD   | PostgreSQLのパスワード   |
| POSTGRES_DB   | PostgreSQLのデータベース名   |
| POSTGRES_PORT   | PostgreSQLのポート番号   |
| POSTGRES_URL   | PostgreSQLの接続URL  |
| FRONTEND_PORT   | フロントエンドのポート番号   |
| BACKEND_PORT   | バックエンドのポート番号   |
| SECRET_KEY   | JWT認証で使用するセキュリティーキー   |
| ALGORITHM  | パスワードハッシュ化のアルゴリズム   |
| ACCESS_TOKEN_EXPIRE_MINUTES   | アクセストークンの有効期限   |
| GROQ_API_KEY   | GroqのAPIキー   |

