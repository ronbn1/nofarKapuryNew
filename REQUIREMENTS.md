# Website Requirements Document – Nofar Kapuri
**Professional Bridal Makeup Artist & Hair Stylist | Ashdod, Israel**

## 1. Project Overview
Create a modern, elegant, professional and inviting marketing website for **Nofar Kapuri** – a professional bridal makeup artist and hair stylist based in Ashdod, Israel.

**Brand Personality**: Elegant • Soft Luxury • Warm & Personal • Professional • Inviting  
**Target Audience**: Israeli brides looking for high-quality, natural-to-glam bridal makeup and hairstyling.

**Language**: Hebrew only (full RTL support).  
**No English version needed.**

**Technology Stack**:  
- React (preferred – for use with Codex in VS Code)
- Modern, clean, performant React setup (Vite + React recommended)
- Fully responsive
- Mobile-first

## 2. Brand Assets
- **Logo**: The developer will receive a direct link/image of the official logo from the client. Use this logo in the header and favicon.
- **Color Palette**: Soft elegant bridal – Cream / Off-white, Soft Nude / Blush, Champagne Gold, Soft Rose, Charcoal for text.
- **Typography**: Elegant serif for headings + clean modern sans-serif for body text (Hebrew-friendly fonts, e.g. Heebo + elegant serif).
- **Photography**: High-quality bridal portraits, soft glam, natural light aesthetic.

## 3. Site Structure (Single Page or Multi-Section Recommended)

### Header
- Logo
- Navigation (smooth scroll to sections)
- WhatsApp button (054-6477885)

### Hero Section
- Large beautiful bridal photo
- Strong elegant headline in Hebrew
- Short warm subtitle
- Clear CTA button → WhatsApp

### About Section
- Short professional bio in Hebrew (warm and personal tone)
- Emphasize: personal approach, introductory consultation over coffee and cake at a café in Ashdod, comes to the preparation location, enhances natural beauty, calm and pleasant atmosphere

### Services Section
- Bridal Makeup + Hair
- Introductory consultation: Nofar invites the bride for coffee and cake at a café in Ashdod. They discuss styling preferences, inspiration, wedding-day arrangements and all questions; Nofar writes down all agreed details. No makeup application or hairstyling is performed at this meeting.
- Bridesmaids / Mother of the bride / Family makeup
- Evening / Event looks
- Note: Works with only one bride per day
- **Do NOT display any prices or price ranges**

### Portfolio / Gallery
- Beautiful filterable or masonry gallery of her work
- High-quality images with lightbox
- Soft, elegant presentation

### Instagram Live Feed
- **Live Instagram feed** of her account: `@nofar_kapury`
- Display recent posts in a clean, elegant grid
- Clicking a post should open Instagram (or use a proper Instagram embed solution)

### Reviews / Testimonials
- Display real positive reviews in Hebrew (from mit4mit, Urban Brides, etc.)
- Elegant cards with stars + client first name
- Focus on professionalism, calm atmosphere, long-lasting makeup, personal service

### Contact Section
- No contact form
- Prominent WhatsApp button (054-6477885)
- Phone number
- Instagram & Facebook links
- Service area note: Ashdod + all over Israel

### Footer
- Logo
- Quick links
- Social icons
- Legal links (Privacy Policy + Accessibility Statement)

## 4. Design & UX Requirements
- Elegant, clean, soft luxury bridal aesthetic
- Lots of white space
- Soft color palette
- Subtle elegant animations only
- Fully responsive (excellent mobile experience)
- Fast loading
- High-quality image optimization
- Smooth scroll navigation

## 5. Israeli Legal Requirements (Mandatory)
- Full **Accessibility** compliance according to Israeli Standard 5568 (WCAG 2.0 Level AA)
  - Keyboard navigation
  - Proper heading structure
  - Alt texts
  - Color contrast
  - Accessibility statement page
  - Accessibility widget/button recommended
- **Privacy Policy** page in Hebrew (according to Israeli Privacy Protection Law)
- Cookie notice (recommended)

## 6. Technical Requirements
- Built with **React**
- Hebrew RTL support throughout
- Live Instagram feed integration for `@nofar_kapury`
- WhatsApp click-to-chat (054-6477885)
- SEO basics (Hebrew meta titles & descriptions)
- Clean, maintainable code (suitable for Codex / VS Code workflow)
- Fast performance

## 7. Content Guidelines
- All text in Hebrew only
- Warm, personal, professional tone
- No prices of any kind
- No contact form
- Strong emphasis on the personal experience and calm atmosphere Nofar creates

## 8. Reference Style
Look for inspiration from elegant soft-glam bridal makeup artist websites:
- Clean layouts
- Large high-quality photography
- Soft neutral colors
- Minimal and refined design

---
**Important Notes for the AI Agent / Developer**:
- The site must feel luxurious yet warm and inviting.
- Instagram feed must be live (not static screenshots).
- Logo will be provided via link by the client.
- Build it in React so it can be developed and maintained easily with Codex in VS Code.

## 9. Current implementation status — 18.09.2026

- Implemented: React + Vite + TypeScript, Tailwind CSS, shadcn/ui/Radix, Hebrew-only RTL, responsive layout, WhatsApp and phone links, real portfolio images, gallery filtering/lightbox, FAQ, local fonts and static prerendering.
- Business facts confirmed: Nofar is based in Ashdod and travels to the preparation location throughout Israel; she does not receive clients at the business address. Introductory meetings take place by arrangement at a café in Ashdod over coffee and cake, with no makeup or hairstyling trial. One bride is booked per day.
- SEO wording prioritizes Ashdod without implying an Ashdod-only service area: “איפור ועיצוב שיער לכלות באשדוד ובכל הארץ”.
- Implemented legal pages: Hebrew privacy policy and accessibility statement. No price list and no contact form.
- Implemented accessibility features: semantic structure, skip link, keyboard operation, focus handling, image alternatives, reduced-motion support, automated axe checks, and an optional display panel for larger text, higher contrast and reduced motion. This is not a professional certification of compliance with Israeli Standard 5568.
- The live Instagram feed and testimonials remain deferred. The current gallery contains local optimized copies of approved real Instagram images and links to their source posts.
- No analytics, advertising pixels, embedded social feed, browser storage or site-created cookies are currently used. Reassess privacy/cookie requirements if any are added.
- Hosting selected: Cloudflare Pages connected to GitHub `ronbn1/nofarKapuryNew`, production branch `main`. Custom-domain activation is still in progress.
