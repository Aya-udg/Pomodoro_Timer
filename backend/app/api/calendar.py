from fastapi import APIRouter, Request, status
from sqlmodel import Session, select
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from models import Schedule
from models.settings import engine


router = APIRouter()


# エラーを見やすく
@router.exception_handler(RequestValidationError)
async def handler(request: Request, exc: RequestValidationError):
    print(exc)
    return JSONResponse(content={}, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)


# 一覧表示
@router.get("/")
def get_schedule():
    with Session(engine) as session:
        statement = select(Schedule)
        results = session.exec(statement).all()
        return results


# 登録
@router.post("/registr", response_model=Schedule)
def schedule_registr(schedule: Schedule):
    with Session(engine) as session:
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
def schedule_update(item_id: int, updated_schedule: Schedule):
    with Session(engine) as session:
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
def schedule_delete(item_id: int):
    with Session(engine) as session:
        statement = select(Schedule).where(Schedule.id == item_id)
        results = session.exec(statement)
        schedule = results.one()

        session.delete(schedule)
        session.commit()
        return schedule
