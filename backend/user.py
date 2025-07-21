from jose import jwt, JWTError
from fastapi import Depends, FastAPI, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from models import User
from datetime import datetime, timedelta,timezone

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

app = FastAPI()

# このURLにユーザー名とパスワードが送信される
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# アクセストークンの生成関数
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    # トークンの有効期限が設定されてたらその時間に合わせる
    if expires_delta:
        expires_delta = datetime.now(timezone.utc) + expires_delta
    else:
        

@app.get("/items")
async def read_items(token: str = Depends(oauth2_scheme)):
    return {"token": token}


def fake_decode_token(token):
    return User(username=token + "fakedecoded", email="john@example.com")


# ユーザーを取得
async def get_current_user(token: str = Depends(oauth2_scheme)):
    user = fake_decode_token(token)
    return user


@app.get("/users/me")
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user


# ログインフォームの内容を登録ユーザーと照らし合わせる
@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user_dict = fake_users_db.get(form_data.username)
    if not user_dict:
        raise HTTPException(status_code=400, detail="ユーザー名が不正です")

    user = UserInDB(**user_dict)
