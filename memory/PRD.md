# GlideQuantum Labs - Agency Website PRD

## Original Problem Statement
Rebuild the GlideQuantum Labs agency website (glidequantumlabs.com) to serve as a powerful sales presentation tool. Target: ALL business industries (not limited). Must be cinematic, motion-heavy, and make visitors immediately want to contact for services. Showcase ability to build websites, mobile apps, desktop apps, and full business automation suites.

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Framer Motion + Lenis Smooth Scroll + GSAP
- **Backend**: FastAPI + MongoDB (contact form, demo bookings, site config)
- **Hosting**: Preview at biz-automate-9.preview.emergentagent.com

## User Personas
1. **Business Owner without website** — Sees the site, gets impressed, contacts via WhatsApp/form/demo booking
2. **Srinikethan (Owner)** — Uses this as a demo tool during client meetings, updates contact info easily via config.js

## Core Requirements
- Dark, cinematic aesthetic with heavy motion graphics
- Universal industry appeal (12+ industries showcased)
- Contact form + WhatsApp integration + Demo booking
- Configurable contact details (config.js)
- Single-page scrolling experience

## What's Been Implemented

### Phase 1 (March 6, 2026) — Core Website
- **Hero Section**: Cinematic entrance with particle grid, orbit rings, gradient text animations, platform badges (Web/Mobile/Desktop)
- **Floating Navbar**: Glassmorphic pill with nav links, mobile responsive, Book Demo CTA
- **Marquee Band**: Scrolling service keywords
- **Industries Section**: 12 industry cards with parallax horizontal scroll and image backgrounds
- **Services Bento Grid**: 10 services (Websites, Mobile Apps, Desktop Apps, Analytics, CRM, WhatsApp Automation, etc.)
- **Process Timeline**: 5-step animated timeline
- **Why Choose Us**: 6 trust cards + 4 stats bar
- **CTA Band**: "Ready to Automate?" call-to-action
- **Contact Section**: Glassmorphic form with industry dropdown
- **Footer**: Brand info, navigation, contact links
- **Backend**: Contact form + site config CRUD APIs

### Phase 2 (March 6, 2026) — Enhancements
- **WhatsApp Live Chat Widget**: Floating green bubble with chat panel, quick reply buttons, custom message input
- **Book a Demo Call Scheduler**: 3-step modal (Date → Time → Details) stored in MongoDB, with success confirmation
- **Testimonials Section**: 6 testimonial cards from various industries (Real Estate, Restaurant, Healthcare, Auto, Recruiting, Pharma)
- **FAQ Accordion**: 8 common questions with expandable answers covering pricing, timeline, ownership, support
- **Before vs After Transformation**: 6 comparison rows showing business without vs with GlideQuantum + impact stats
- **Backend**: New endpoints for demo bookings (POST/GET /api/book-demo, /api/demo-bookings)
- **Testing**: 100% backend, 95%+ frontend success rate

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/ | Health check |
| POST | /api/contact | Submit contact form |
| GET | /api/contacts | List all contacts |
| POST | /api/book-demo | Book a demo call |
| GET | /api/demo-bookings | List all bookings |
| GET | /api/config | Get site config |
| PUT | /api/config | Update site config |

## Contact Config
- WhatsApp: 919032247068
- Email: Nikethangouda@gmail.com
- Location: Hyderabad, India
- Config file: /app/frontend/src/config.js

## Prioritized Backlog
### P0 (Done)
- [x] Full website rebuild with all sections
- [x] Contact form with MongoDB storage
- [x] WhatsApp integration & live chat widget
- [x] Book a Demo Call scheduler
- [x] Testimonials section
- [x] FAQ section
- [x] Before vs After transformation
- [x] Motion graphics throughout

### P1 (Next)
- [ ] Background music per industry section (user originally requested)
- [ ] Interactive demo previews embedded on site
- [ ] Admin panel for managing contacts & demo bookings
- [ ] Real client testimonials with photos

### P2 (Future)
- [ ] Blog/case studies section
- [ ] Multi-language support (Hindi, Telugu)
- [ ] Analytics dashboard for tracking leads
- [ ] SEO optimization and meta tags
- [ ] Portfolio gallery with before/after
- [ ] Email notification on new lead
