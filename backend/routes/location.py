from database import get_db
from database.models import City, Location, admin
from fastapi import APIRouter, Depends, HTTPException, Form, UploadFile, File
from pydantic import BaseModel, HttpUrl
from routes.auth import get_current_user
from sqlalchemy.orm import Session
from typing import Optional
import os, shutil, json

router = APIRouter()
UPLOAD_DIR = "static/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# Define a Pydantic model to receive the request data for adding attractions
class LocationCreate(BaseModel):
    city_id: int
    name: str
    description: str
    location_data: str
    image_url: Optional[HttpUrl] = None 


@router.post("/add_location/")
async def add_location(
    city_id: int = Form(...),
    name: str = Form(...),
    description: str = Form(...),
    location_data: str = Form(...),
    file: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_admin: admin = Depends(get_current_user),
):
    city = db.query(City).get(city_id)
    if not city:
        raise HTTPException(status_code=404, detail="❌ City not found!")
    
    image_url = None
    if file:
        file_path = f"{UPLOAD_DIR}/{file.filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        image_url = f"/{file_path}"

    location_data = json.loads(location_data)

    new_location = Location(
        city_id=city_id,
        name=name,
        description=description,
        location_data=location_data,
        image_url=image_url,
    )
    db.add(new_location)
    db.commit()
    db.refresh(new_location)
    return {
        "message": f"Location '{new_location.name}' created.",
        "location": {
            "id": new_location.id,
            "image_url": new_location.image_url,
            "city_id": new_location.city_id,
            "name": new_location.name,
            "description": new_location.description,
            "location_data": new_location.location_data,
        },
    }



@router.get("/city/{city_id}/locations", response_model=list[dict])
def get_locations_by_city(city_id: int, db: Session = Depends(get_db)):
    locations = db.query(Location).filter(Location.city_id == city_id).all()
    return [
        {
            "id": loc.id,
            "city_id": loc.city_id,
            "name": loc.name,
            "description": loc.description,
            "location_data": json.dumps(loc.location_data),
            "image_url": loc.image_url,
        }
        for loc in locations
    ]


@router.get("/location/{location_id}")
def get_location(location_id: int, db: Session = Depends(get_db)):
    location = db.query(Location).filter(Location.id == location_id).first()
    if not location:
        raise HTTPException(status_code=404, detail="❌ Location not found!")

    return {
        "id": location.id,
        "city_id": location.city_id,
        "name": location.name,
        "description": location.description,
        "location_data": json.dumps(location.location_data),
    }


@router.delete("/delete_location/{location_id}")
def delete_location(
    location_id: int,
    db: Session = Depends(get_db),
    current_admin: admin = Depends(get_current_user),
):
    location = db.query(Location).filter(Location.id == location_id).first()
    if not location:
        raise HTTPException(status_code=404, detail="❌ Location not found!")

    db.delete(location)
    db.commit()
    return {"message": f"✅ Location '{location.name}' deleted successfully!"}


class LocationUpdate(BaseModel):
    name: str
    description: str
    location_data: str
    image_url: Optional[HttpUrl] = None 

@router.put("/update_location/{location_id}")
async def update_location(
    location_id: int,
    name: str = Form(...),
    description: str = Form(...),
    location_data: str = Form(...),
    file: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_admin: admin = Depends(get_current_user),
):
    location = db.query(Location).get(location_id)
    if not location:
        raise HTTPException(status_code=404, detail="❌ Location not found!")

    location.name = name
    location.description = description
    location.location_data = json.loads(location_data)

    if file:
        if location.image_url and os.path.exists(location.image_url):
            os.remove(location.image_url)
        file_path = f"{UPLOAD_DIR}/{file.filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        location.image_url = f"/{file_path}"

    db.commit()
    db.refresh(location)
    
    return {
        "message": f"Location '{location.name}' updated.",
        "location": {
            "id": location.id,
            "image_url": location.image_url,
            "city_id": location.city_id,
            "name": location.name,
            "description": location.description,
            "location_data": location.location_data,
        },
    }

@router.get("/locations", response_model=list[dict])
def get_all_locations(db: Session = Depends(get_db)):
    locations = db.query(Location).all()
    return [
        {
            "id": loc.id,
            "city_id": loc.city_id,
            "name": loc.name,
            "description": loc.description,
            "location_data": json.dumps(loc.location_data),
            "image_url": loc.image_url,
        }
        for loc in locations
    ]
