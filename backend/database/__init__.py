from .models import Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv
import bcrypt
from database.models import admin


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Create a database engine
engine = create_engine(os.getenv("DATABASE_URL"))

# Create a Session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

try:
    Base.metadata.create_all(engine)
    print("✅ Database tables created successfully!")
except Exception as e:
    print(f"❌ Failed to create database tables: {e}")
    raise

# Create an administrator if not already present
db = SessionLocal()
username = "admin"
email = "admin"
password = os.environ.get("AUTH_SECRET")

existing_admin = db.query(admin).filter_by(username=username).first()
if not existing_admin:
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode(
        "utf-8"
    )
    new_admin = admin(username=username, email=email, password_hash=hashed_password)
    db.add(new_admin)
    db.commit()
    print("✅ Admin created successfully!")
else:
    print("ℹ️ Admin already exists, skipping creation.")
db.close()