# GlideQuantum Labs - Agency Website PRD

## Original Problem Statement
Rebuild the GlideQuantum Labs agency website (glidequantumlabs.com) to serve as a powerful sales presentation tool. Target: ALL business industries (not limited). Must be cinematic, motion-heavy, and make visitors immediately want to contact for services. Showcase ability to build websites, mobile apps, desktop apps, and full business automation suites.

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Framer Motion + Lenis Smooth Scroll
- **Backend**: FastAPI + MongoDB (contact form storage, site config)
- **Hosting**: Preview at biz-automate-9.preview.emergentagent.com

## User Personas
1. **Business Owner without website** — Sees the site, gets impressed, contacts via WhatsApp/form
2. **Srinikethan (Owner)** — Uses this as a demo tool during client meetings, updates contact info easily

## Core Requirements
- Dark, cinematic aesthetic with heavy motion graphics
- Universal industry appeal (12+ industries showcased)
- Contact form + WhatsApp integration
- Configurable contact details (config.js)
- Single-page scrolling experience

## What's Been Implemented (March 6, 2026)
- **Hero Section**: Cinematic entrance with particle grid, orbit rings, gradient text animations, platform badges (Web/Mobile/Desktop)
- **Floating Navbar**: Glassmorphic pill with nav links, mobile responsive with animated menu
- **Marquee Band**: Scrolling service keywords
- **Industries Section**: 12 industry cards (Real Estate, Restaurants, Healthcare, Education, Automobile, Recruiting, Pharma, Travel, Retail, Warehousing, Agriculture, Fitness) with parallax horizontal scroll and image backgrounds
- **Services Bento Grid**: 10 services (Websites, Mobile Apps, Desktop Apps, Analytics, CRM, WhatsApp Automation, Business Automation, Security, Cloud Infra, Custom Integrations)
- **Process Timeline**: 5-step animated timeline (Discovery → Design → Development → Launch → Support)
- **Why Choose Us**: 6 trust cards + 4 stats bar
- **CTA Band**: "Ready to Automate?" call-to-action
- **Contact Section**: Glassmorphic form with industry dropdown, WhatsApp/Email/Location cards
- **Footer**: Brand info, navigation, contact links
- **Backend API**: Contact form submission, contacts listing, site config CRUD
- **Testing**: 97% success rate (100% backend, 95% frontend)

## Prioritized Backlog
### P0 (Done)
- [x] Full website rebuild with all sections
- [x] Contact form with MongoDB storage
- [x] WhatsApp integration
- [x] Motion graphics throughout

### P1 (Next)
- [ ] Background music per industry section (user requested)
- [ ] Interactive demo previews embedded on site
- [ ] Admin panel for managing contact submissions
- [ ] Testimonials/social proof section

### P2 (Future)
- [ ] Blog/case studies section
- [ ] Multi-language support
- [ ] Analytics dashboard for tracking leads
- [ ] A/B testing for CTA buttons
- [ ] SEO optimization and meta tags
- [ ] Portfolio gallery with before/after comparisons

## Contact Config
- WhatsApp: 919032247068
- Email: Nikethangouda@gmail.com
- Location: Hyderabad, India
- Config file: /app/frontend/src/config.js
