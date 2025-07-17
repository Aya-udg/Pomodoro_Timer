from fastapi import FastAPI
from sqlmodel import Field, SQLModel, Session, select
from settings import engine
from db import Timer

app = FastAPI()


# データ取得
@app.get("/timer/")
def read_timer_settings():
    with Session(engine) as session:
        statement = select(Timer)
        results = session.exec(statement)
        return results


# データ更新
