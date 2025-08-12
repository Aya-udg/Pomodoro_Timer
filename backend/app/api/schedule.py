from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from models.models import Schedule, User, ScheduleCreate
from models.settings import engine
from .users import get_current_active_user

router = APIRouter()


# 依存関係作成
def get_session():
    with Session(engine) as session:
        yield session


# 一覧表示
@router.get("/schedule")
def get_schedule(
    user: User = Depends(get_current_active_user),
    session: Session = Depends(get_session),
):
    statement = select(Schedule).where(Schedule.user_id == user.id)
    results = session.exec(statement).all()
    return results


# 登録
@router.post("/schedule-registr", response_model=Schedule)
def schedule_registr(
    schedule: ScheduleCreate,
    # ログインユーザーのデータを取得
    user: User = Depends(get_current_active_user),
    session: Session = Depends(get_session),
):
    new_schedule = Schedule(
        user_id=user.id,
        title=schedule.title,
        start=schedule.start,
        end=schedule.end,
        completed=schedule.completed,
        timer=schedule.timer,
        description=schedule.description,
        memo=schedule.memo,
        color=schedule.color,
    )
    session.add(new_schedule)
    session.commit()
    session.refresh(new_schedule)
    return new_schedule


# 更新
@router.put("/schedule-update/{item_id}", response_model=Schedule)
def schedule_update(
    item_id: int,
    updated_schedule: Schedule,
    user: User = Depends(get_current_active_user),
    session: Session = Depends(get_session),
):
    statement = (
        select(Schedule)
        # 更新対象のアイテムを抽出
        .where(Schedule.id == item_id)
        # ログインしているユーザーのデータを抽出
        .where(Schedule.user_id == user.id)
    )
    results = session.exec(statement)
    schedule = results.one()

    schedule.title = updated_schedule.title
    schedule.start = updated_schedule.start
    schedule.end = updated_schedule.end
    schedule.completed = updated_schedule.completed
    schedule.description = updated_schedule.description
    schedule.timer = updated_schedule.timer
    schedule.memo = updated_schedule.memo
    schedule.color = updated_schedule.color

    session.add(schedule)
    session.commit()
    session.refresh(schedule)
    return schedule


# 削除
@router.delete("/schedule-delete/{item_id}")
def schedule_delete(item_id: int, session: Session = Depends(get_session)):
    statement = select(Schedule).where(Schedule.id == item_id)
    results = session.exec(statement).first()
    if not results:
        raise HTTPException(status_code=404, detail="ページが見つかりません")
    session.delete(results)
    session.commit()
