from models import Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create the database engine
engine = create_engine(os.getenv("DATABASE_URL"))

# Create a Session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

try:
    Base.metadata.create_all(engine)
    print("✅ Database tables created successfully!")
except Exception as e:
    print(f"❌ Failed to create database tables: {e}")
    raise
