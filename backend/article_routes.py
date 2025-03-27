#Author:YIBO LIANG

from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from backend.dependencies import get_db 
from database.models import Article, Location
import os
import shutil,uuid


router = APIRouter()



UPLOAD_FOLDER = "uploaded_images"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  

@router.post("/upload_image")
async def upload_image(file: UploadFile = File(...)):
    
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only allow image files to be uploaded")
    
    
    ext = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4().hex}{ext}"
    file_path = os.path.join(UPLOAD_FOLDER, unique_filename)
    
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to upload image: " + str(e))
    
    
    return {"url": f"http://localhost:8000/{UPLOAD_FOLDER}/{unique_filename}"}




# get all articles
@router.get("/articles")
def get_articles(db: Session = Depends(get_db)):
    articles = db.query(Article).all()
    result = []
    for article in articles:
        result.append({
            'id': article.id,
            'title': article.title,
            'content_html': article.content_html,
            'created_at': article.created_at.isoformat() if article.created_at else None,
            'updated_at': article.updated_at.isoformat() if article.updated_at else None,
            'locations': [{'id': loc.id, 'name': loc.name} for loc in article.locations]
        })
    return result

# get a article using a article_id
@router.get("/articles/{article_id}")
def get_article(article_id: int, db: Session = Depends(get_db)):
    article = db.query(Article).get(article_id)
    if not article:
        raise HTTPException(status_code=404, detail="alticle not fond")
    result = {
        'id': article.id,
        'title': article.title,
        'content_html': article.content_html,
        'created_at': article.created_at.isoformat() if article.created_at else None,
        'updated_at': article.updated_at.isoformat() if article.updated_at else None,
        'locations': [{'id': loc.id, 'name': loc.name} for loc in article.locations]
    }
    return result

# Create a new article
@router.post("/articles")
def create_article(data: dict, db: Session = Depends(get_db)):
    if not data or 'title' not in data or 'content_html' not in data:
        raise HTTPException(status_code=400, detail="Required field is missing: title 和 content_html")

    article = Article(
        title=data['title'],
        content_html=data['content_html']
    )

    # If location_ids is passed in, associate the article with the corresponding location
    location_ids = data.get('location_ids')
    if location_ids and isinstance(location_ids, list):
        for loc_id in location_ids:
            location = db.query(Location).get(loc_id)
            if location:
                article.locations.append(location)
    try:
        db.add(article)
        db.commit()
        db.refresh(article)
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    return {"message": "Article created successfully", "article_id": article.id}

# update a article
@router.put("/articles/{article_id}")
def update_article(article_id: int, data: dict, db: Session = Depends(get_db)):
    article = db.query(Article).get(article_id)
    if not article:
        raise HTTPException(status_code=404, detail="Article not exist")
    if not data:
        raise HTTPException(status_code=400, detail="No updated data provided")

    if 'title' in data:
        article.title = data['title']
    if 'content_html' in data:
        article.content_html = data['content_html']

    if 'location_ids' in data:
        # Remove all connected places first
        for loc in article.locations.all():
            article.locations.remove(loc)
        # Add a new associated location
        for loc_id in data['location_ids']:
            location = db.query(Location).get(loc_id)
            if location:
                article.locations.append(location)
    try:
        db.commit()
        db.refresh(article)
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    return {"message": "Article updated successfully"}

# delete article
@router.delete("/articles/{article_id}")
def delete_article(article_id: int, db: Session = Depends(get_db)):
    article = db.query(Article).get(article_id)
    if not article:
        raise HTTPException(status_code=404, detail="article not fond")
    try:
        db.delete(article)
        db.commit()
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    return {"message": "Article deleted successfully"}
