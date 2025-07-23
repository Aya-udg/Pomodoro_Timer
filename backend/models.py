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


class User(SQLModel):
    id: int | None = Field(default=None, primary_key=True)
    username: str = Field(nullable=False)
    email: str | None = Field(default=None, nullable=False)


# トークンのデータモデル
class Token(SQLModel):
    access_token: str
    token_type: str


# トークンに含まれるデータモデル
class Tokendata(SQLModel):
    username: str | None = Field(default=None)


# データベース内のユーザーデータモデル
class UserInDB(User):
    hashed_password: str
