from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()

api_router = APIRouter(prefix="/api")


class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    business_name: Optional[str] = ""
    industry: Optional[str] = ""
    message: Optional[str] = ""
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactSubmissionCreate(BaseModel):
    name: str
    phone: str
    business_name: Optional[str] = ""
    industry: Optional[str] = ""
    message: Optional[str] = ""


class SiteConfig(BaseModel):
    model_config = ConfigDict(extra="ignore")
    whatsapp_number: str = "919032247068"
    email: str = "Nikethangouda@gmail.com"
    company_name: str = "GlideQuantum Labs"
    tagline: str = "We Build Software That Grows Your Business"


@api_router.get("/")
async def root():
    return {"message": "GlideQuantum Labs API"}


@api_router.post("/contact", response_model=ContactSubmission)
async def submit_contact(input_data: ContactSubmissionCreate):
    submission = ContactSubmission(**input_data.model_dump())
    doc = submission.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.contact_submissions.insert_one(doc)
    return submission


@api_router.get("/contacts", response_model=List[ContactSubmission])
async def get_contacts():
    contacts = await db.contact_submissions.find({}, {"_id": 0}).to_list(1000)
    for c in contacts:
        if isinstance(c['timestamp'], str):
            c['timestamp'] = datetime.fromisoformat(c['timestamp'])
    return contacts


@api_router.get("/config", response_model=SiteConfig)
async def get_config():
    config = await db.site_config.find_one({}, {"_id": 0})
    if not config:
        default = SiteConfig()
        await db.site_config.insert_one(default.model_dump())
        return default
    return SiteConfig(**config)


@api_router.put("/config", response_model=SiteConfig)
async def update_config(config: SiteConfig):
    doc = config.model_dump()
    await db.site_config.replace_one({}, doc, upsert=True)
    return config


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
