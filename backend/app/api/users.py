from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from sqlmodel import Session, select
from models.settings import engine
import os
from models.models import User, TokenWithUsername, TokenData, UserCreate, UserLogin
from datetime import datetime, timedelta, timezone
from fastapi.middleware.cors import CORSMiddleware


# 依存関係作成
def get_session():
    with Session(engine) as session:
        yield session


SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")

# パスワードのハッシュ化に使用するコンテキスト
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# このURLにユーザー名とパスワードが送信される
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

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
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# 現在のユーザーを取得する関数
async def get_current_user(
    token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if not token:
        raise HTTPException(status_code=401, detail="not token")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(token_data.username, session)
    if user is None:
        raise credentials_exception
    return user


# 現在のアクティブユーザーを取得する関数
async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


# アクセストークンを取得するためのエンドポイント
@router.post("/token")
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session),
    tags=["users"],
):
    user = authenticate_user(form_data.username, form_data.password, session)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return TokenWithUsername(
        access_token=access_token, token_type="bearer", username=user.username
    )


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
