from fastapi import FastAPI
from sqlmodel import Field,SQLModel,Session,select

app = FastAPI()


# データ取得
@app.get('/timer/')
def read_timer_settings():
    with Session
