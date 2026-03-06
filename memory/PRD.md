# GlideQuantum Labs - Agency Website PRD

## Original Problem Statement
Rebuild GlideQuantum Labs agency website as a cinematic, motion-heavy sales tool for ALL industries. WhatsApp + Email notifications.

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Framer Motion + Lenis Smooth Scroll
- **Backend**: FastAPI + MongoDB + Resend (email notifications)
- **Preview**: biz-automate-9.preview.emergentagent.com

## What's Been Implemented

### Phase 1 — Core Website
- Hero with particles/orbits, Industries (12+), Services (10), Process (5-step), Why Choose Us, CTA, Contact, Footer
- Floating glassmorphic navbar, marquee band, parallax scroll

### Phase 2 — Enhancements
- WhatsApp Live Chat Widget, Book Demo Scheduler (3-step), Testimonials (6), FAQ (8), Before vs After

### Phase 3 — Email Notifications (Resend)
- **Owner notification** on contact form submit + demo booking (to Nikethangouda@gmail.com)
- **Client confirmation email** on demo booking (to client's email with date/time/what-to-expect/WhatsApp button)
- Sender: notifications@glidequantumlabs.com (verified domain)
- Beautiful dark-themed HTML email templates

## Email Flows
| Trigger | To Owner | To Client |
|---------|----------|-----------|
| Contact form submit | Lead details + WhatsApp reply btn | — |
| Demo call booked | Booking details + WhatsApp confirm btn | Confirmation with date/time + what to expect + WhatsApp btn |

## Backlog
### P1
- [ ] Background music per industry section
- [ ] Interactive embedded demo previews
- [ ] Admin panel for managing leads/bookings
### P2
- [ ] Blog/case studies, SEO, multi-language, analytics dashboard
