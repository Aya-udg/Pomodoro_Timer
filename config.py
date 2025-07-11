import os
from sqlmodel import create_engine
from dotenv import load_dotenv

load_dotenv(dotenv_path=".env")
path = os.getenv("POSTGRES_URL")

