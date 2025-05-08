from database import get_db
from database.models import City
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from pydantic import BaseModel, HttpUrl
from routes.auth import get_current_user
from sqlalchemy.orm import Session
from typing import Optional
import os
import shutil

router = APIRouter()


class CityCreate(BaseModel):
    name: str
    description: str
    image_url: Optional[HttpUrl] = None


UPLOAD_DIR = "static/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/add_city/")
async def add_city(
    name: str = Form(...),
    description: str = Form(...),
    file: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_admin=Depends(get_current_user),
):
    existing_city = db.query(City).filter(City.name == name).first()
    if existing_city:
        raise HTTPException(status_code=400, detail="❌ City already exists!")

    image_url = None
    if file:
        file_path = f"{UPLOAD_DIR}/{file.filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        image_url = f"/{file_path}"

    new_city = City(name=name, description=description, image_url=image_url)
    db.add(new_city)
    db.commit()

    return {
        "message": f"✅ City '{name}' created successfully!",
        "image_url": image_url,
    }


@router.get("/cities", response_model=list[dict])
def get_cities(db: Session = Depends(get_db)):
    cities = db.query(City).all()
    return [{"id": city.id, "name": city.name, "description": city.description, "image_url": city.image_url} for city in cities]


@router.delete("/delete_city/{city_id}")
def delete_city(
    city_id: int, db: Session = Depends(get_db), current_admin=Depends(get_current_user)
):
    city = db.query(City).filter(City.id == city_id).first()
    if not city:
        raise HTTPException(status_code=404, detail="❌ City not found!")

    db.delete(city)
    db.commit()
    return {"message": f"✅ City '{city.name}' deleted successfully!"}


class CityUpdate(BaseModel):
    name: str
    description: str
    image_url: Optional[HttpUrl] = None


@router.put("/update_city/{city_id}")
async def update_city(
    city_id: int,
    name: str = Form(...),
    description: str = Form(...),
    file: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_admin=Depends(get_current_user),
):
    city = db.query(City).filter(City.id == city_id).first()
    if not city:
        raise HTTPException(status_code=404, detail="❌ City not found!")

    city.name = name
    city.description = description

    if file:
        file_path = f"{UPLOAD_DIR}/{file.filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        city.image_url = f"/{file_path}"

    db.commit()
    return {"message": f"✅ City '{city.name}' updated successfully!"}


@router.get("/city/{city_id}")
def get_city(city_id: int, db: Session = Depends(get_db)):
    city = db.query(City).filter(City.id == city_id).first()
    if not city:
        raise HTTPException(status_code=404, detail="❌ City not found!")

    return {
        "id": city.id,
        "name": city.name,
        "description": city.description,
        "image_url": city.image_url,
    }
