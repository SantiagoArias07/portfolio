# Santiago Arias Paul — Portfolio

Personal portfolio site. Dark techy aesthetic, one-page scroll, built to feel alive.

**Live:** [santiagoapaul.dev](https://santiagoapaul.dev) <!-- update when deployed -->

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript — strict mode |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion v12 |
| 3D | React Three Fiber + drei |
| Smooth scroll | Lenis |
| Fonts | Geist + Geist Mono via `next/font` |
| Deploy | Vercel |

---

## Interaction System

The site has a cohesive interaction layer, not isolated tricks:

- **Custom cursor** — small dot that morphs on hover, becomes a crosshair over project cards. Hidden on touch devices.
- **HUD corners** — fixed elements showing live timestamp, Monterrey coordinates, scroll %, site version.
- **Section transitions** — each section types in its mono label (`02 / ABOUT`) and draws an accent line on scroll enter.
- **Glitch effect** — CSS clip-path glitch on the hero name at load and periodically. Used nowhere else.
- **`prefers-reduced-motion`** — all animations disabled, glitch off, cursor hidden, functional transitions only.

---

## Project Structure

```
app/
  layout.tsx          # Root layout, metadata, schema.org Person
  page.tsx            # One-page composition
  globals.css         # Design tokens, glitch keyframes
  opengraph-image.tsx # Custom OG image (edge runtime)
  sitemap.ts
  robots.ts

components/
  ui/
    CustomCursor.tsx
    HUD.tsx
    SectionWrapper.tsx  # Label typewriter + accent line draw
    GlitchText.tsx
    LenisProvider.tsx
  hero/
    HeroSection.tsx
    ScrollIndicator.tsx
  three/
    HeroScene.tsx       # R3F canvas — distorted wireframe icosahedron
  about/
  credentials/
  work/
  hackathons/
  stack/
  contact/

lib/
  animations.ts         # EASE_OUT constant, shared Variants
  hooks/
    useReducedMotion.ts
    useScrollProgress.ts
```

---

## Design Tokens

Defined as CSS variables in `app/globals.css`:

```
--bg-base:        #0a0a0a
--bg-raised:      #111111
--bg-overlay:     #1a1a1a
--border:         #1f1f1f
--text-primary:   #ededed
--text-secondary: #a1a1a1
--text-tertiary:  #6b6b6b
--accent:         #00ff88   ← phosphor green, used sparingly
--accent-dim:     rgba(0,255,136,0.15)
--danger:         #ff0055   ← glitch only
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Sections

| # | Section | Notes |
|---|---|---|
| 01 | Hero | R3F wireframe icosahedron, mouse-reactive, glitch on name |
| 02 | About | Editorial 2/3 + metadata column layout |
| 03 | Credentials | Fundación Gallagher + CODEX feature cards |
| 04 | Selected Work | Case study cards — **TODO: add real projects** |
| 05 | Hackathons | Timeline format — **TODO: add real events** |
| 06 | Stack | Grouped by category with one-liner context |
| 07 | Contact | Email CTA + copy button, GitHub, LinkedIn, CV |

---

## Pending TODOs

- [ ] Fill in real project data in `components/work/WorkSection.tsx`
- [ ] Fill in hackathon entries in `components/hackathons/HackathonsSection.tsx`
- [ ] Add LinkedIn URL in `components/contact/ContactSection.tsx`
- [ ] Add `public/cv.pdf`
- [ ] Update domain in `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`
- [ ] Add preview images/videos for project cards

---

## Performance Budget

| Metric | Target |
|---|---|
| Lighthouse Performance | 95+ |
| Lighthouse Accessibility | 100 |
| LCP | < 2.0s |
| CLS | < 0.05 |
| INP | < 200ms |

3D scene lazy-loads with `next/dynamic({ ssr: false })`. Fallback is a CSS radial gradient.

---

## Deploy

Push to `main` → Vercel auto-deploys.

```bash
git add .
git commit -m "feat: initial portfolio build"
git push origin main
```

---

Built by [Santiago Arias Paul](https://github.com/SantiagoArias07)
