from fastapi import HTTPException, Depends, APIRouter, status
from sqlmodel import Session, select
from models.settings import engine
from models.models import StudyHistory, User
from sqlalchemy import func
from .users import get_current_active_user


# 依存関係作成
def get_session():
    with Session(engine) as session:
        yield session


router = APIRouter()


# 同日の勉強データをまとめた勉強データの取得
@router.get("/studyhistory/summary-by-date")
def read_study_history_day(
    session: Session = Depends(get_session),
    user: User = Depends(get_current_active_user),
):
    statement = (
        select(
            StudyHistory.date, func.sum(StudyHistory.duration).label("total_minutes")
        )
        .where(StudyHistory.user_id == user.id)
        .group_by(StudyHistory.date)
        .order_by(StudyHistory.date)
    )
    results = session.exec(statement).all()
    if not results:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="勉強履歴がありません"
        )
    return [{"date": row[0], "duration": row[1]} for row in results]


# 勉強データ追加
@router.post("/studyhistory/pos", response_model=StudyHistory)
def add_study_history(
    history: StudyHistory,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_active_user),
):
    data = StudyHistory(
        date=history.date,
        duration=history.duration,
        memo=history.memo,
        tag=history.tag,
        user_id=user.id,
    )
    session.add(data)
    session.commit()
    session.refresh(data)
    return history
