from database import get_db
from database.models import admin
from fastapi import APIRouter, Depends, HTTPException
from routes.auth import get_current_user
from sqlalchemy.orm import Session
import bcrypt

router = APIRouter()


@router.post("/create_admin/")
def create_admin(
    username: str,
    email: str,
    password: str,
    db: Session = Depends(get_db),
    current_admin: admin = Depends(get_current_user),
):
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode(
        "utf-8"
    )
    new_admin = admin(username=username, email=email, password_hash=hashed_password)
    db.add(new_admin)
    db.commit()
    return {"message": "✅ Admin created successfully!"}
