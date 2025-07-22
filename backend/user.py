from jose import jwt, JWTError
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from models import User, Token, Tokendata, UserInDB
from datetime import datetime, timedelta, timezone

# JWTトークンの設定
***REMOVED***
***REMOVED***
***REMOVED***


# ダミーのユーザーデータ
fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "fakehashedsecret",
        "disabled": False,
    },
    "alice": {
        "username": "alice",
        "full_name": "Alice Wonderson",
        "email": "alice@example.com",
        "hashed_password": "fakehashedsecret2",
        "disabled": True,
    },
}

# パスワードのハッシュ化に使用するコンテキスト
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# このURLにユーザー名とパスワードが送信される
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()


# パスワードの検証関数
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


# パスワードのハッシュ化関数
def get_password_hash(password):
    return pwd_context.hash(password)


# ユーザー名からユーザー情報を取得する関数
def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)


# ユーザーの認証関数
def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
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
async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = Tokendata(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(fake_users_db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


# 現在のアクティブユーザーを取得する関数
async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


# アクセストークンを取得するためのエンドポイント
@app.post("/token")
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
) -> Token:
    user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    if not user 

@app.get("/items")
async def read_items(token: str = Depends(oauth2_scheme)):
    return {"token": token}


@app.get("/users/me")
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
