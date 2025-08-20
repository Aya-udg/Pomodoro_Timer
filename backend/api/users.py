from jose import jwt, JWTError, ExpiredSignatureError
from fastapi import Depends, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from sqlmodel import Session, select
from models.settings import engine
import os
from models.models import User, TokenWithUsername, TokenData
from datetime import datetime, timedelta, timezone


# 依存関係作成
def get_session():
    with Session(engine) as session:
        yield session


SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")
REFRESH_TOKEN_EXPIRE_DAYS = os.getenv("REFRESH_TOKEN_EXPIRE_DAYS")


# パスワードのハッシュ化に使用するコンテキスト
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# このURLにユーザー名とパスワードが送信される
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def credentials_exception(code: str):
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail={"message": "認証に失敗しました", "code": code},
        headers={"WWW-Authenticate": "Bearer"},
    )


router = APIRouter()


# パスワードの検証関数
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


# パスワードのハッシュ化関数
def get_password_hash(password):
    return pwd_context.hash(password)


# ユーザー名からユーザー情報を取得する関数
def get_user(username: str, session: Session):
    statement = select(User).where(User.username == username)
    result = session.exec(statement).first()
    return result


# ユーザーの認証関数
def authenticate_user(username: str, password: str, session: Session):
    user = get_user(username, session)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


# アクセストークンの生成関数
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    # トークンの有効期限が設定されてたらその時間に合わせる
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    # 設定されていなかったら15分にする
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire, "token_type": TokenWithUsername.access_token})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# リフレッシュトークンの生成関数（作成））
def create_refresh_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire, "token_type": TokenWithUsername.refresh_token})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# 現在のユーザーを取得する関数
async def get_current_user(
    # oauth2_schemeを使ってBearer トークンを抜き取る
    token: str = Depends(oauth2_scheme),
    session: Session = Depends(get_session),
) -> User:

    if not token:
        credentials_exception("ユーザーが見つかりません")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except ExpiredSignatureError:
        credentials_exception("トークンの有効期限切れです")
    except JWTError:
        credentials_exception("無効なアクセスです")
    username: str = payload.get("sub")
    if not username:
        credentials_exception("不正なトークンです")
    token_data = TokenData(username=username)
    user = get_user(token_data.username, session)
    # 登録していないユーザー
    if not user:
        credentials_exception("ユーザーが見つかりません")
    return user


# 現在のアクティブユーザーを取得する関数
async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user
