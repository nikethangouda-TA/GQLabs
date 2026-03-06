# GlideQuantum Labs - Agency Website PRD

## Original Problem Statement
Rebuild the GlideQuantum Labs agency website (glidequantumlabs.com) to serve as a powerful sales presentation tool. Target: ALL business industries. Cinematic, motion-heavy. WhatsApp + Email notifications for leads.

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Framer Motion + Lenis Smooth Scroll
- **Backend**: FastAPI + MongoDB + Resend (email notifications)
- **Preview**: biz-automate-9.preview.emergentagent.com

## What's Been Implemented

### Phase 1 — Core Website (March 6, 2026)
- Hero, Industries (12+), Services (10), Process (5-step), Why Choose Us, CTA, Contact Form, Footer
- Floating glassmorphic navbar, marquee band, particle effects, parallax scroll

### Phase 2 — Enhancements (March 6, 2026)
- WhatsApp Live Chat Widget, Book a Demo Call Scheduler (3-step), Testimonials (6), FAQ (8), Before vs After Transformation

### Phase 3 — Email Notifications (March 6, 2026)
- **Resend integration** — instant email to Nikethangouda@gmail.com on:
  - New contact form submission (with lead details + WhatsApp reply button)
  - New demo call booking (with date/time + confirm via WhatsApp button)
- Sender: notifications@glidequantumlabs.com (verified domain)
- Beautiful dark-themed HTML email templates matching site aesthetic
- Non-blocking async email delivery

## API Endpoints
| Method | Endpoint | Description | Email? |
|--------|----------|-------------|--------|
| POST | /api/contact | Submit contact form | Yes |
| GET | /api/contacts | List all contacts | No |
| POST | /api/book-demo | Book demo call | Yes |
| GET | /api/demo-bookings | List all bookings | No |
| GET | /api/config | Get site config | No |
| PUT | /api/config | Update site config | No |

## Contact Config
- WhatsApp: 919032247068 | Email: Nikethangouda@gmail.com
- Config file: /app/frontend/src/config.js
- Sender: notifications@glidequantumlabs.com

## Backlog
### P1
- [ ] Background music per industry section
- [ ] Interactive embedded demo previews
- [ ] Admin panel for managing leads/bookings
### P2
- [ ] Blog/case studies, SEO, multi-language, analytics dashboard
