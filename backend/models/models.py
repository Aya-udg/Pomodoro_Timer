from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional


# class Timer(SQLModel, table=True):
#     id: Optional[int] = Field(default=None, primary_key=True)
#     hour: int | None
#     minutes: int = Field(default=25, nullable=True)
#     second: int | None
#     user_id: Optional[int] = Field(default=None, foreign_key="users.id")


class Schedule(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(nullable=False)
    start: datetime = Field(nullable=False)
    end: datetime = Field(nullable=False)
    completed: bool = Field(nullable=False)
    description: Optional[str] = Field(default=None, nullable=True)
    timer: int = Field(nullable=False)
    memo: Optional[str] = Field(default=None, nullable=True)
    color: str = Field(nullable=False)
    user_id: Optional[int] = Field(default=None, foreign_key="users.id")


class StudyHistory(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    date: str = Field(nullable=False)
    duration: int = Field(nullable=False)
    memo: Optional[str]
    tag: Optional[str]
    user_id: Optional[int] = Field(default=None, foreign_key="users.id")


class Chats(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    message: str = Field(nullable=False)
    response: str = Field(nullable=False)
    date: str = Field(nullable=False)
    user_id: Optional[int] = Field(default=None, foreign_key="users.id")


class User(SQLModel, table=True):
    __tablename__ = "users"
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(nullable=False)
    hashed_password: str = Field(nullable=False)
    disabled: bool | None = Field(default=None)


# トークンのデータモデル
class TokenWithUsername(SQLModel):
    access_token: str
    token_type: str
    username: str


# トークンに含まれるデータモデル
class TokenData(SQLModel):
    username: Optional[str] = Field(default=None)


# ユーザー登録用のモデル
class UserCreate(SQLModel):
    username: str
    password: str


# カレントユーザー取得用のモデル
class UserLogin(SQLModel):
    username: str


# スケジュール受け取り用モデル
class ScheduleCreate(SQLModel):
    title: str
    start: datetime
    end: datetime
    completed: bool
    description: Optional[str] = None
    timer: Optional[int] = None
    memo: Optional[str] = None
    color: Optional[str] = None


# AIチャットのモデル
class AIRequest(SQLModel):
    message: str
    date: str
