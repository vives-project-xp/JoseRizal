# about_routes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.models import CMSContent
from backend.dependencies import get_db  # 你原来的 DB session getter
from pydantic import BaseModel

router = APIRouter()

# Pydantic schema
class AboutInfoSchema(BaseModel):
    content: str

    class Config:
        orm_mode = True


@router.get("/about", response_model=AboutInfoSchema)
def get_about_info(db: Session = Depends(get_db)):
    info = db.query(AboutInfo).order_by(AboutInfo.updated_at.desc()).first()
    if not info:
        raise HTTPException(status_code=404, detail="About information not found")
    return info


@router.post("/about", response_model=AboutInfoSchema)
def create_about_info(data: AboutInfoSchema, db: Session = Depends(get_db)):
    new_info = AboutInfo(content=data.content)
    db.add(new_info)
    db.commit()
    db.refresh(new_info)
    return new_info


@router.put("/about/{id}", response_model=AboutInfoSchema)
def update_about_info(id: int, data: AboutInfoSchema, db: Session = Depends(get_db)):
    info = db.query(AboutInfo).filter(AboutInfo.id == id).first()
    if not info:
        raise HTTPException(status_code=404, detail="About info not found")
    info.content = data.content
    db.commit()
    db.refresh(info)
    return info


@router.delete("/about/{id}")
def delete_about_info(id: int, db: Session = Depends(get_db)):
    info = db.query(AboutInfo).filter(AboutInfo.id == id).first()
    if not info:
        raise HTTPException(status_code=404, detail="About info not found")
    db.delete(info)
    db.commit()
    return {"message": "About info deleted"}