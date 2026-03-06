from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend setup
resend.api_key = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL', 'Nikethangouda@gmail.com')

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ─── Models ───

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


class DemoBooking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = ""
    business_name: Optional[str] = ""
    preferred_date: str
    preferred_time: str
    notes: Optional[str] = ""
    status: str = "pending"
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class DemoBookingCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = ""
    business_name: Optional[str] = ""
    preferred_date: str
    preferred_time: str
    notes: Optional[str] = ""


class SiteConfig(BaseModel):
    model_config = ConfigDict(extra="ignore")
    whatsapp_number: str = "919032247068"
    email: str = "Nikethangouda@gmail.com"
    company_name: str = "GlideQuantum Labs"
    tagline: str = "We Build Software That Grows Your Business"


# ─── Email Notifications ───

async def send_contact_notification(contact: ContactSubmission):
    html = f"""
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a14; color: #ffffff; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #7000FF, #00F0FF); padding: 24px 32px;">
            <h1 style="margin: 0; font-size: 20px; color: #fff;">New Lead Received</h1>
            <p style="margin: 4px 0 0; font-size: 13px; color: rgba(255,255,255,0.8);">Someone just submitted the contact form</p>
        </div>
        <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #94A3B8; font-size: 13px; width: 120px;">Name</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #fff; font-size: 14px; font-weight: 600;">{contact.name}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #94A3B8; font-size: 13px;">Phone</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #fff; font-size: 14px; font-weight: 600;">{contact.phone}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #94A3B8; font-size: 13px;">Business</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #fff; font-size: 14px;">{contact.business_name or 'Not specified'}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #94A3B8; font-size: 13px;">Industry</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #fff; font-size: 14px;">{contact.industry or 'Not specified'}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; color: #94A3B8; font-size: 13px; vertical-align: top;">Message</td>
                    <td style="padding: 12px 0; color: #fff; font-size: 14px;">{contact.message or 'No message'}</td>
                </tr>
            </table>
            <div style="margin-top: 24px;">
                <a href="https://wa.me/{contact.phone.replace('+','').replace(' ','')}" style="display: inline-block; padding: 12px 24px; background: #22C55E; color: #fff; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 600;">Reply on WhatsApp</a>
            </div>
        </div>
        <div style="padding: 16px 32px; background: rgba(255,255,255,0.03); text-align: center;">
            <p style="margin: 0; font-size: 11px; color: #94A3B8;">GlideQuantum Labs · Lead Notification</p>
        </div>
    </div>
    """
    try:
        await asyncio.to_thread(resend.Emails.send, {
            "from": f"GlideQuantum Labs <{SENDER_EMAIL}>",
            "to": [NOTIFICATION_EMAIL],
            "subject": f"New Lead: {contact.name} — {contact.industry or 'General Inquiry'}",
            "html": html,
        })
        logger.info(f"Contact notification sent for {contact.name}")
    except Exception as e:
        logger.error(f"Failed to send contact notification: {e}")


async def send_demo_booking_notification(booking: DemoBooking):
    html = f"""
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a14; color: #ffffff; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #7000FF, #A855F7); padding: 24px 32px;">
            <h1 style="margin: 0; font-size: 20px; color: #fff;">Demo Call Booked!</h1>
            <p style="margin: 4px 0 0; font-size: 13px; color: rgba(255,255,255,0.8);">Someone wants a 15-min demo call with you</p>
        </div>
        <div style="padding: 32px;">
            <div style="background: rgba(112, 0, 255, 0.1); border: 1px solid rgba(112, 0, 255, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 24px; text-align: center;">
                <p style="margin: 0 0 4px; font-size: 13px; color: #A855F7; text-transform: uppercase; letter-spacing: 2px;">Scheduled For</p>
                <p style="margin: 0; font-size: 24px; font-weight: 700; color: #fff;">{booking.preferred_date}</p>
                <p style="margin: 4px 0 0; font-size: 18px; color: #00F0FF;">{booking.preferred_time} IST</p>
            </div>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #94A3B8; font-size: 13px; width: 120px;">Name</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #fff; font-size: 14px; font-weight: 600;">{booking.name}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #94A3B8; font-size: 13px;">Phone</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #fff; font-size: 14px; font-weight: 600;">{booking.phone}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #94A3B8; font-size: 13px;">Email</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #fff; font-size: 14px;">{booking.email or 'Not provided'}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #94A3B8; font-size: 13px;">Business</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #fff; font-size: 14px;">{booking.business_name or 'Not specified'}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; color: #94A3B8; font-size: 13px; vertical-align: top;">Notes</td>
                    <td style="padding: 12px 0; color: #fff; font-size: 14px;">{booking.notes or 'No notes'}</td>
                </tr>
            </table>
            <div style="margin-top: 24px;">
                <a href="https://wa.me/{booking.phone.replace('+','').replace(' ','')}" style="display: inline-block; padding: 12px 24px; background: #22C55E; color: #fff; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 600; margin-right: 8px;">Confirm on WhatsApp</a>
            </div>
        </div>
        <div style="padding: 16px 32px; background: rgba(255,255,255,0.03); text-align: center;">
            <p style="margin: 0; font-size: 11px; color: #94A3B8;">GlideQuantum Labs · Demo Booking Notification</p>
        </div>
    </div>
    """
    try:
        await asyncio.to_thread(resend.Emails.send, {
            "from": f"GlideQuantum Labs <{SENDER_EMAIL}>",
            "to": [NOTIFICATION_EMAIL],
            "subject": f"Demo Call Booked: {booking.name} — {booking.preferred_date} at {booking.preferred_time}",
            "html": html,
        })
        logger.info(f"Demo booking notification sent for {booking.name}")
    except Exception as e:
        logger.error(f"Failed to send demo booking notification: {e}")


# ─── Routes ───

@api_router.get("/")
async def root():
    return {"message": "GlideQuantum Labs API"}


@api_router.post("/contact", response_model=ContactSubmission)
async def submit_contact(input_data: ContactSubmissionCreate):
    submission = ContactSubmission(**input_data.model_dump())
    doc = submission.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.contact_submissions.insert_one(doc)
    # Send email notification (non-blocking)
    asyncio.create_task(send_contact_notification(submission))
    return submission


@api_router.get("/contacts", response_model=List[ContactSubmission])
async def get_contacts():
    contacts = await db.contact_submissions.find({}, {"_id": 0}).to_list(1000)
    for c in contacts:
        if isinstance(c['timestamp'], str):
            c['timestamp'] = datetime.fromisoformat(c['timestamp'])
    return contacts


@api_router.post("/book-demo", response_model=DemoBooking)
async def book_demo(input_data: DemoBookingCreate):
    booking = DemoBooking(**input_data.model_dump())
    doc = booking.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.demo_bookings.insert_one(doc)
    # Send email notification (non-blocking)
    asyncio.create_task(send_demo_booking_notification(booking))
    return booking


@api_router.get("/demo-bookings", response_model=List[DemoBooking])
async def get_demo_bookings():
    bookings = await db.demo_bookings.find({}, {"_id": 0}).to_list(1000)
    for b in bookings:
        if isinstance(b['timestamp'], str):
            b['timestamp'] = datetime.fromisoformat(b['timestamp'])
    return bookings


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


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
