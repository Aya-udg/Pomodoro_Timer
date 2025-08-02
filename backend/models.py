from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional
from uuid import UUID


class Timer(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    hour: int | None
    minutes: int = Field(default=25, nullable=True)
    second: int | None


class StudyHistory(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    date: str = Field(nullable=False)
    duration: int = Field(nullable=False)
    memo: Optional[str]
    tag: Optional[str]


class User(SQLModel, table=True):
    __tablename__ = "users"
    id: int | None = Field(default=None, primary_key=True)
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
    username: str | None = Field(default=None)


# ユーザー登録用のモデル
class UserCreate(SQLModel):
    username: str
    password: str


# カレントユーザー取得用のモデル
class UserLogin(SQLModel):
    username: str
