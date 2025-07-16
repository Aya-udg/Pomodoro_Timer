import os
from dotenv import load_dotenv
from sqlmodel import create_engine

load_dotenv(dotenv_path="../.env")
path = os.getenv("POSTGRES_URL")

engine = create_engine(path, echo=True)
