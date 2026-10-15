---
version: alpha
name: "Abdullah Al Shehri Law"
description: "Arabic law-office brand site, approved scales mark and a photo-led service slider."
colors:
  primary: "#143E31"
  deep: "#0B241B"
  background: "#F7F3EB"
  bronze: "#B48753"
  bronze-text: "#886239"
  hero-accent: "#E2C79F"
  ink: "#171D1A"
  muted: "#5D6761"
  border: "#D9DDD3"
typography:
  display:
    fontFamily: "Plex, Tahoma, sans-serif"
    fontWeight: 500
  body:
    fontFamily: "Plex, Tahoma, sans-serif"
    fontWeight: 400
  control:
    fontFamily: "Plex, Tahoma, sans-serif"
    fontWeight: 500
rounded:
  DEFAULT: "3px"
  sm: "2px"
  lg: "4px"
spacing:
  page-max: "1320px"
  desktop-gutter: "56px"
  mobile-gutter: "24px"
components:
  button: {}
  header: {}
  slider: {}
---

# Abdullah Al Shehri Design System

## Overview

### Creative North Star

A restrained legal editorial identity: forest leather, ivory documents, bronze scales and precise Arabic typography. The approved v3 scales mark anchors the identity. The visual signature of the current homepage is a full-viewport service slider with bespoke conceptual legal-desk imagery, readable copy and deliberate image reveals.

### Product context and register

- Audience: businesses, investors and individuals seeking to understand a service and arrange a consultation. Jeddah office; service across Saudi Arabia and remotely, from the client Word answers in `docs/client-word-extracted.txt`.
- Locale: Arabic, RTL. Latin file/domain names are technical metadata; the Arabic company name leads. English spelling is provisional.
- Register: brand/content website. Booking is a separate bounded three-step form; this header/hero change does not alter its data or receiving policy.
- Evidence: `brand/approval.json`, `brand/design-tokens.json`, `docs/website-plan-ar.md`, client Word extraction and the user's current direction.
- Status: v3 logo approved. Website directions remain reviewable. Current user decisions: fullscreen slider; translucent desktop header remains visible and its top strip collapses after scrolling. Mobile has no strip, booking on the left, the approved scales mark above the company name in the center, and Menu on the right. Mobile header hides on downward scroll and returns on upward scroll.
- Restraint: no invented client testimonials, outcome statistics or staff photos. The homepage, service previews and navigation use distinct generated images for all eight practices and three guides, alongside the earlier legal still lifes. Their forest, ivory and bronze palette follows the brand. These are conceptual illustrations, not photographs of actual premises, staff or cases. Source PNGs and exact prompts are preserved in brand/visuals and docs/practice-image-prompts-v2.json.
- Current redesign: remove decorative trust-strip repetition and oversized service/article indices. Give each home section a distinct task: choose a practice, understand the office, prepare a booking, answer a question, read a preparation guide. Shared service photos and concise headings support these tasks. Research and current image provenance live in `docs/redesign-decisions-ar.md` and `docs/practice-image-prompts-v2.json`. Earlier stock-photo records remain archived in `docs/photography-sources.json`.
- Anti-references: decorative courtroom arches surrounding a flat scales icon; boxed hero compositions rejected by the user; unrelated SaaS cards and saturated effects.
- Token ownership: existing `src/styles/tokens.css` is canonical for runtime theme values. This file mirrors them and records intent; it does not generate CSS. `@theme inline` maps semantic variables to Tailwind and shadcn utilities. Brand exports own the approved logo/palette; the light hero accent is a digital text treatment, not a logo recolor.

## Colors

Forest is the primary/action role, deep green the image overlay, ivory the light surface. Bronze marks details; bronze-text is the darker readable text variant on ivory. Hero-accent is the lighter text variant on photographs. Header surfaces use the existing forest/ivory with alpha; opacity never applies to the entire header or its text. Layered green image shading supports the white headline and controls across all three photos.

| Role                   | Canonical token           | Consumers                        |
| ---------------------- | ------------------------- | -------------------------------- |
| Brand/action           | `--forest`, `--primary`   | shared Button/CTA, navigation    |
| Dark surface           | `--deep`                  | slider background and overlays   |
| Light surface          | `--ivory`, `--background` | header, body, reverse CTA        |
| Decorative accent      | `--bronze`                | mark details, active navigation  |
| Light hero text accent | `--hero-accent`           | slider headline and active track |
| Readable bronze text   | `--color-bronze-text`     | text on ivory                    |
| Border/muted           | `--line`, `--muted`       | lists, fields, scrollbar         |

## Typography

IBM Plex Sans Arabic is loaded locally as Plex at weights 400/500/600. Display uses weight 500 and script-safe line height; body copy uses weight 400 and line height near 2. Header and buttons use weight 500. Tahoma/sans-serif are fallbacks. Keep the approved family rather than adding a second Arabic face for this feature. Slider desktop display 42–76px, narrow display 30–42px; supporting body 14–17px. Arabic prose is never italicized. Logo lettering is outlined in the exported SVG.

## Layout

Desktop content maximum is 1320px; typical inset 56px, narrow inset 24px. Navigation switches at 1024px. The fullscreen slider owns `min-height:100svh`; document scrolling remains natural. Do not fix the body or clip its contents to force a one-screen composition. On short or enlarged-text viewports the hero can grow so booking and slide controls remain reachable.

The homepage slider has a fixed overlay header, so the strip's collapse never changes hero geometry. Other hero alternatives and inner pages retain their existing conventional header placement. The mobile consultation bar stays hidden while the homepage hero is visible; it appears after that section leaves view. Hero controls reserve the safe-area inset. Desktop separates a full-height image on the left from copy on the right. At 700px and below, the image appears above the copy and fills the available width; its crop retains the scales finial, beam and base. Mobile keeps one short description and two actions without decorative arrows, removes location/repeated consultation captions, and uses three numbered slide controls with topic names available to assistive technology. Copy and control rows stay on the brand grid.

## Elevation & Depth

Desktop header remains visible, with 18px blur and a modest ivory/forest surface opacity reduction after scrolling. Only its green top strip collapses. Below 1024px the strip is absent and the header moves out of view on downward scroll after 96px, returning on upward scroll. Keyboard focus and an open menu keep it visible. Three.js is isolated to the three alternate directions and loads when useful; it is not part of the default photo slider. Avoid added logo shadows or bevels.

## Shapes

Use precise rectangular image and control edges. Shared controls have 2–4px radius. Do not return the rejected arch hero. Circular shapes are reserved for the seal intro or explicit 3D relationship concept.

## Components

### Foundational visual states

All primary actions have readable default, hover and focus-visible states. Selection uses a line plus `aria-pressed`; it is not color-only. Empty/error states retain text and an available action. A plain page-loading indicator is already owned by App Suspense. Busy and error booking behavior stays in its feature module.

### Buttons and actions

Shared shadcn Button and ConsultationCTA own actions. The single wording is «احجز استشارة». White reverse CTA on the photograph; forest CTA on ivory. Slider arrows have 44px targets and accessible names; they also provide the non-drag alternative to swipe. Automatic playback is opt-in, pauses on hover/focus/hidden tab, and is unavailable for reduced-motion users.

### Navigation and data display

Desktop services use a shared Radix/shadcn Popover disclosure with eight direct practice links grouped by audience, plus the full directory. Normal website links retain navigation semantics; no application `menu` role is added. The mobile Sheet has a services Accordion, ordinary page links, a contract still life and a booking action. Escape, outside dismissal and trigger-focus restoration belong to the primitives. Directory filters and query persist in URL parameters; clearing retains the audience and restores search focus. The home practice explorer changes a photo, short description and direct service link. On mobile, practice choices use a scrollable row rather than a long list above the photo.

Header owns the site nav and mobile Radix Sheet. Desktop strip appears only at the top; desktop navigation stays visible after scroll. Mobile uses three grid slots with equal outer widths and equal outer grid slots, with a compact 44px menu target and a wider booking label. The approved scales artwork is cropped to a balanced mobile viewBox without changing its paths, displayed at 36px above a 12–13.5px company name with 1.2 line height and a 3px gap, centered in a 76px header. Mobile uses automatic scrollbar gutter so an unused reserved edge cannot shift the identity. Booking is on the physical left and Menu on the physical right. Mobile has no green strip and direction-aware hiding with small thresholds to avoid jitter. Retain current page underline, route-aware labels, and Sheet Escape/focus restoration. Design lab remains a local comparison tool rather than a public marketing navigation item.

### Forms and overlays

The existing three-step consultation flow keeps its data in page memory and distinguishes review from delivery. Contacts and receiving endpoint are placeholders until approved. Date ownership is intentionally native: a preferred date, not confirmed availability; the browser/OS calendar presentation is acceptable for this draft. Sheet and Accordion are authored Radix primitives with Arabic labels. This marketing update does not introduce CRUD, account permissions or destructive actions.

### Iconography

Lucide icons support controls at 16–20px. Use the approved scales mark for branding; do not substitute a Lucide Scale as the primary brand logo. Icon-only controls have Arabic accessible names.

### Motion

The user selected «01 · لحظة الحكم» (`balance-onyx`) as the default intro. GSAP reveals the consultation steps once with scoped cleanup; Motion owns practice-preview crossfades and directory filtering/layout. Root MotionConfig follows the user's reduced-motion setting, and GSAP skips the step reveal in that mode. Initial server-rendered content is visible without JavaScript. Libraries do not share animated properties on a node.

GSAP owns photo scale/clipping, the alternate 3D scroll rig, and the ten SVG balance/sword intro timelines, with useGSAP cleanup. Motion owns text transitions, the five earlier intro directions, and active navigation indicator. No two libraries animate the same property on the same node. Header strip collapses in about 300ms; photo reveal lasts 1.15s; text transition .55s. New balance intros take 2.9–3.3s plus exit, once per session with skip; the earlier five last 2.4–2.6s. The SVG balance swings around its beam pivot while inverse bowl rotation keeps suspensions vertical. A sword descends into the center, then the beam settles horizontally. This is an illustrative motion scene; the approved static logo files are preserved. Reduced-motion users receive static balanced artwork and no automatic introductory overlay. Monolith uses CSS depth, not a Three.js mesh.

### Content and data visualization

Arabic professional, plain and useful. Avoid guarantees or fabricated credentials. Three service slides are content choices, not a success statistic; 01, 02 and 03 select their respective topics. Generated still lifes illustrate legal work and preparation; they do not identify office staff, actual premises or case outcomes. Remove redundant slogans and location copy from the homepage hero while retaining useful office/contact information in its appropriate pages.

## Do's and Don'ts

- Do preserve approved logo proportions and the palette across inner pages.
- Do keep full content and controls reachable on short screens, at zoom and without JavaScript.
- Do use semantic controls, visible scrollbars and reduced-motion alternatives.
- Don't hide desktop navigation during scroll. Mobile hides only while scrolling down; upward scrolling, keyboard focus and an open menu restore it.
- Don't make hero sizing depend on the header's collapsing height.
- Don't create additional fake company information to fill visual space.

## Current presentation comparison

The design lab slider tab compares separated image/copy and a full-image hero, with four green overlay levels. Both are responsive and keep natural document scrolling. The default remains separated until a user applies a different local choice. Generated service images are distinct by topic; their sources and exact prompts are preserved. The office section is an ivory editorial composition with a large square image and a short office introduction. Text links use an extending underline; booking uses a clearly labeled button. Direct slide choices, swipe and keyboard navigation replace the decorative previous/next arrow row.

Mobile refinement: the navigation glyph is 20px inside a transparent 44px target; the booking label keeps its wider ivory button. The mark remains centered over the name. Home guides use a full-width feature photograph with its title below, replacing the split image/text card on narrow screens.
# Homepage motion and section rhythm — 2026-10-12

The actual homepage now separates its office section with deep green and the FAQ with a pale muted surface. Mobile section padding is 76px; internal grouping remains tighter. Office and journey headings precede their photographs on mobile. Office uses the justice image, leaving consultation imagery to the booking invitation.

`useHomeMotion` owns scoped GSAP entrances, office image scroll parallax and the journey progress line. Every journey step and reading link triggers at its own viewport entry. Motion owns only service preview swapping and its nested image/copy choreography. No node has competing animation owners. Reduced motion, no-JS content, keyboard focus and route cleanup are preserved. Reference audit: `docs/homepage-review-motion-ar.md`.

# Approved header and repeatable home intro — 2026-10-12

The production default is the forest header with a deep-green top strip, reversed brand logo and ivory booking button. The strip remains absent on mobile. The approved selection uses `shehri-header-approved-v2`, so older comparison preferences do not override this choice.

Home intro replays on every home entry, same-home link, refresh and restored browser page. An inline brand cover precedes the JavaScript bundle, and a capture-phase home navigation gate covers route loading. React hands it over to the approved balance animation before showing the homepage. Exit waits for the minimum intro duration, fonts and header/hero imagery, with a bounded recovery for unavailable assets. Inert content and scroll locking remain until the exit finishes; no-JS content stays visible.

