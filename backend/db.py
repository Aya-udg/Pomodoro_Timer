from sqlmodel import SQLModel, Field


class Timer(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    hour: int | None
    minutes: int = Field(nullable=True)
    second: int | None
