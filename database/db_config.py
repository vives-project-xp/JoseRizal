from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

# Load database configuration from environment variables
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# Create the database engine
engine = create_engine(DATABASE_URL)

# Create a Session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
