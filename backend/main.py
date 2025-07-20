from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from settings import engine
from models import Timer, StudyHistory
from sqlalchemy import func

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
    if not results:
        raise HTTPException(status_code=404, detail="データが存在しません")
    return results


# 同日の勉強データをまとめた勉強データの取得
@app.get("/studyhistory/summary-by-date")
def read_study_history_day(session: Session = Depends(get_session)):
    statement = (
        select(
            StudyHistory.date, func.sum(StudyHistory.duration).label("total_minutes")
        )
        .group_by(StudyHistory.date)
        .order_by(StudyHistory.date)
    )
    results = session.exec(statement).all()
    if not results:
        raise HTTPException(status_code="404", detail="勉強履歴がありません")
    return [{"date": row[0], "duration": row[1]} for row in results]


# タグごとにまとめた勉強データの取得
@app.get("/studyhistory/summary-by-tag")
def read_study_history_tag(session: Session = Depends(get_session)):
    statement = select(
        StudyHistory.tag, func.sum(StudyHistory.duration).label("total_minutes")
    ).group_by(StudyHistory.tag)
    results = session.exec(statement).all()
    if not results:
        raise HTTPException(status_code="404", detail="勉強履歴がありません")
    return [{"tag": row[0], "duration": row[1]} for row in results]


# 勉強データ追加
@app.post("/studyhistory/pos", response_model=StudyHistory)
def add_study_history(history: StudyHistory, session: Session = Depends(get_session)):
    session.add(history)
    session.commit()
    # これ大事
    session.refresh(history)
    return history
