from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routes.admin import router as admin_router
from routes.article import router as article_router
from routes.auth import router as auth_router
from routes.city import router as city_router
from routes.location import router as location_router
from routes.media import router as media_router
from routes.about import router as about_router


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
    "/uploaded_images",
    StaticFiles(directory="uploaded_images"),
    name="uploaded_images",
)
app.mount(
    "/static",
    StaticFiles(directory="static"),
    name="static",
)

# Create an API router with the "/api" prefix
api_router = APIRouter(prefix="/api")

# Include all routers in the api_router
api_router.include_router(auth_router, prefix="/auth")
api_router.include_router(admin_router)
api_router.include_router(city_router)
api_router.include_router(location_router)
api_router.include_router(media_router, prefix="/media")
api_router.include_router(article_router)
api_router.include_router(about_router, prefix="/about")

# Include the api_router in the main app
app.include_router(api_router)
