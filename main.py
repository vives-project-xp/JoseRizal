#Author:YIBO LIANG

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.auth import router as auth_router
from backend.admin_routes import router as admin_router
from backend.city_routes import router as city_router
from backend.location_routes import router as location_router
from backend.media_routes import router as media_router
from backend.article_routes import router as article_router
from fastapi.staticfiles import StaticFiles
from backend.about_routes import router as about_router



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Aggregate routes of various modules
app.mount("/uploaded_images", StaticFiles(directory="uploaded_images"), name="uploaded_images")
app.include_router(auth_router, prefix="/auth")
app.include_router(admin_router)
app.include_router(city_router)
app.include_router(location_router)
app.include_router(media_router, prefix="/media")
app.include_router(article_router)
app.include_router(about_router)
