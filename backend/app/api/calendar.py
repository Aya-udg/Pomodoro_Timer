from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from models.models import Schedule
from models.settings import engine


router = APIRouter()


# 依存関係作成
def get_session():
    with Session(engine) as session:
        yield session


# 一覧表示
@router.get("/schedule")
def get_schedule(session: Session = Depends(get_session)):
    statement = select(Schedule)
    results = session.exec(statement).all()
    return results


# 登録
@router.post("/registr", response_model=Schedule)
def schedule_registr(schedule: Schedule, session: Session = Depends(get_session)):
    new_schedule = Schedule(
        title=schedule.title,
        start=schedule.start,
        end=schedule.end,
        completed=schedule.completed,
        timer=schedule.timer,
        description=schedule.title,
        memo=schedule.memo,
        color=schedule.color,
    )
    session.add(new_schedule)
    session.commit()
    session.refresh(new_schedule)
    return new_schedule


# 更新
@router.put("/update/{item_id}", response_model=Schedule)
def schedule_update(
    item_id: int, updated_schedule: Schedule, session: Session = Depends(get_session)
):
    statement = select(Schedule).where(Schedule.id == item_id)
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
@router.delete("/delete/{item_id}", response_model=Schedule)
def schedule_delete(item_id: int, session: Session = Depends(get_session)):
    statement = select(Schedule).where(Schedule.id == item_id)
    results = session.exec(statement)
    schedule = results.one()

    session.delete(schedule)
    session.commit()
    return schedule
