from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from api import study_record, users, schedule, ai, login
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# エラーを見やすく
@app.exception_handler(RequestValidationError)
async def handler(request: Request, exc: RequestValidationError):
    print(exc)
    return JSONResponse(content={}, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)


app.include_router(study_record.router)
app.include_router(users.router)
app.include_router(login.router)
app.include_router(schedule.router)
app.include_router(ai.router)
