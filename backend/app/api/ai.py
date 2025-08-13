from dotenv import load_dotenv
import os
from pydantic_ai import Agent
from pydantic_ai.models.groq import GroqModel
from pydantic_ai.providers.groq import GroqProvider
from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from models.settings import engine
from .users import get_current_active_user
from models.models import User, AIRequest, Chats

router = APIRouter()


# 依存関係作成
def get_session():
    with Session(engine) as session:
        yield session


load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

model = GroqModel(
    "llama-3.3-70b-versatile",
    provider=GroqProvider(api_key=GROQ_API_KEY),
)
agent = Agent(
    model,
    system_prompt="相手を前向きに褒める優しい怪獣。敬語は使わない。必ず根拠を1つ入れること。語尾には絵文字もつけること",
)


@router.post("/ai", response_model=Chats)
def post_chat(
    payload: AIRequest,
    user: User = Depends(get_current_active_user),
    session: Session = Depends(get_session),
):
    result = agent.run_sync(payload.message)
    new_chat = Chats(
        message=payload.message,
        response=result.output,
        date=payload.date,
        user_id=user.id,
    )
    session.add(new_chat)
    session.commit()
    session.refresh(new_chat)
    return new_chat


@router.get("/chats_history")
def get_chat(
    user: User = Depends(get_current_active_user),
    session: Session = Depends(get_session),
):
    statement = (
        select(Chats)
        .where(Chats.user_id == user.id)
        .order_by(Chats.id.desc())
        .limit(10)
    )
    results = session.exec(statement).all()
    return results
