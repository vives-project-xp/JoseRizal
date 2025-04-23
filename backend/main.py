from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routes.admin import router as admin_router
from routes.article import router as article_router
from routes.auth import router as auth_router
from routes.city import router as city_router
from routes.location import router as location_router
from routes.media import router as media_router


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Aggregate routes of various modules
app.mount(
    "/uploaded_images", StaticFiles(directory="/uploaded_images"), name="uploaded_images"
)
app.include_router(auth_router, prefix="/auth")
app.include_router(admin_router)
app.include_router(city_router)
app.include_router(location_router)
app.include_router(media_router, prefix="/media")
app.include_router(article_router)
