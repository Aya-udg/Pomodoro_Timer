from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional


class Timer(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    hour: int | None
    minutes: int = Field(default=25, nullable=True)
    second: int | None


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


class StudyHistory(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(nullable=False)
    date: str = Field(nullable=False)
    duration: int = Field(nullable=False)
    memo: Optional[str]
    tag: Optional[str]


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
    username: Optional[int] = Field(default=None)


# ユーザー登録用のモデル
class UserCreate(SQLModel):
    username: str
    password: str


# カレントユーザー取得用のモデル
class UserLogin(SQLModel):
    username: str
