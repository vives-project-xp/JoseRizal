from db_config import engine
from models import Base

# Create database tables
def init_db():
    try:
        Base.metadata.create_all(engine)
        print("✅ Database tables created successfully!")
    except Exception as e:
        print(f"❌ Failed to create database tables: {e}")

if __name__ == "__main__":
    init_db()
