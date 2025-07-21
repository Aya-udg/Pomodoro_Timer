from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional


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
    username: str
    email: str | None = Field(default=None)


class Tokendata(SQLModel):
    pass
