from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session
from models.models import User, TokenWithUsername, UserCreate, UserLogin
from datetime import timedelta
import os
from .users import (
    authenticate_user,
    credentials_exception,
    get_session,
    create_access_token,
    create_refresh_token,
    get_user,
    get_password_hash,
    get_current_active_user,
)

router = APIRouter()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")
REFRESH_TOKEN_EXPIRE_DAYS = os.getenv("REFRESH_TOKEN_EXPIRE_DAYS")


# ログイン用エンドポイント
@router.post("/login")
async def login_for_token(
    responce: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session),
):
    user = authenticate_user(form_data.username, form_data.password, session)
    if not user:
        credentials_exception("ユーザー名かパスワード違います")
    access_token_expires = timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
    refresh_token_expires = timedelta(days=int(REFRESH_TOKEN_EXPIRE_DAYS))
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    refresh_token = create_refresh_token(
        data={"sub": user.username}, expires_delta=refresh_token_expires
    )
    responce.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        expires=refresh_token_expires,
    )
    return TokenWithUsername(
        access_token=access_token,
        token_type="bearer",
        username=user.username,
    )


# ログアウト用エンドポイント
@router.post("/logout")
def logout(response: Response, user: User = Depends(get_current_active_user)):
    refresh_token = response.delete_cookie("refresh_token")
    if not refresh_token:
        raise credentials_exception("リフレッシュトークンがありません")
    return None


# ユーザー登録用のエンドポイント
@router.post("/users/register/", response_model=User, tags=["users"])
def create_user(user_create: UserCreate, session: Session = Depends(get_session)):
    user = get_user(user_create.username, session)
    if user:
        raise HTTPException(
            status_code=400, detail="このユーザー名は既に登録されています"
        )
    hashed_password = get_password_hash(user_create.password)
    new_user = User(username=user_create.username, hashed_password=hashed_password)
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return new_user


# 現在のユーザー情報を取得するエンドポイント
@router.get("/users/me/", response_model=UserLogin, tags=["users"])
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user
