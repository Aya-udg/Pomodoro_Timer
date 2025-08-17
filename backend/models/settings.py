import os
from dotenv import load_dotenv
from sqlmodel import create_engine
from sqlalchemy.ext.declarative import declarative_base

# load_dotenv(dotenv_path="../../.env")
# path = os.getenv("POSTGRES_URL")

load_dotenv()
path = os.getenv("POSTGRES_URL")


engine = create_engine(path, echo=True)
Base = declarative_base()
