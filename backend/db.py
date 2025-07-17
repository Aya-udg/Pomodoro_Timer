from sqlmodel import SQLModel, Field
from datetime import datetime


class Timer(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    hour: int | None
    minutes: int = Field(default=25, nullable=True)
    second: int | None


class StudyHistory(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    date: datetime = Field(nullable=False)
    startTime: int = Field(nullable=False)
    endTime: int = Field(nullable=False)
