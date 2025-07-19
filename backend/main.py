from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, SQLModel, Session, select
from settings import engine
from models import Timer, StudyHistory

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 依存関係作成
def get_session():
    with Session(engine) as session:
        yield session


# タイマー設定のデータ取得
@app.get("/timer")
def read_timer_settings(session: Session = Depends(get_session)):
    statement = select(Timer)
    results = session.exec(statement).all()
    if not statement:
        raise HTTPException(status_code=404, detail="データが存在しません")
    return results


# 勉強データの取得
@app.get("/studyhistory")
def read_study_history(session: Session = Depends(get_session)):
    statement = select(StudyHistory)
    results = session.exec(statement).all()
    if not statement:
        raise HTTPException(status_code="404", detail="勉強履歴がありません")
    return results


# 勉強データ追加
@app.post("/studyhistory/pos", response_model=StudyHistory)
def add_study_history(history: StudyHistory, session: Session = Depends(get_session)):
    session.add(history)
    session.commit()
    # これ大事
    session.refresh(history)
    return history
