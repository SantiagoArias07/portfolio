# Santiago Arias Paul — Portfolio

Personal portfolio site. Dark techy aesthetic, one-page scroll, built as a work sample.

**Live:** [santiagoapaul.dev](https://santiagoapaul.dev) <!-- update when domain is confirmed -->  
**Contact:** santiago.ariasp.dev@gmail.com

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript — strict mode |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion v12 |
| 3D | React Three Fiber + drei v10 |
| Smooth scroll | Lenis v1 |
| Command palette | cmdk |
| Icons | lucide-react |
| Fonts | Geist + Geist Mono via `next/font` |
| Deploy | Vercel |

---

## Sections

| # | Section | Status |
|---|---|---|
| 01 | **Hero** | R3F distorted wireframe icosahedron, mouse-reactive rotation, glitch on name load + periodic |
| 02 | **About** | Editorial 2/3 + metadata sidebar; B.S. Computer Science, Tec de Monterrey, grad 2029 |
| 03 | **Credentials** | Gallagher Foundation scholarship + CODEX program — both 2025, active, with external links |
| 04 | **Selected Work** | ClimateRoots (2026) + WeekFive (2026) — real screenshots, live URLs, repo links, clickable images |
| 05 | **Hackathons** | Capital One (2026), Gen Técnico 2025/2024, Technical Diploma (2025), Programming Cert (2024) |
| 06 | **Stack** | Languages · Frontend · Application & Database · Tooling & Deploy — 19 tools with one-liner context |
| 07 | **Contact** | Email + copy, GitHub, LinkedIn, CV — plus footer |

---

## Interaction System

Cohesive layer, not isolated tricks:

- **Custom cursor** — 8px dot, morphs to 24px on hover, 36px crosshair on project cards. Mix-blend-difference. Hidden on touch.
- **HUD corners** — live timestamp (top-right), Tec de Monterrey coords `25.6515° N, 100.2897° W` (top-right), scroll % (bottom-right), contact icon strip — mail / GitHub / LinkedIn / CV (bottom-left).
- **Command palette** — `⌘K` / `Ctrl+K` / `/` — navigate sections, copy email, open GitHub/LinkedIn, download CV, toggle reduced motion. Visible pill trigger button (bottom-right, above HUD).
- **Section transitions** — mono label types in on scroll enter (`02 / ABOUT`) + accent line draws across viewport.
- **Glitch effect** — CSS clip-path on hero name at load and periodically. Used nowhere else.
- **Ambient backdrop** — fixed WebGL canvas behind all content. Simplex noise shader at 4% opacity — "the void has texture". Pauses on tab-hidden. Freezes on reduced-motion.
- **Console signature** — styled ASCII "SAP" + contact links logged on DevTools open. Recruiter bait.
- **`prefers-reduced-motion`** — all animations, glitch, parallax, backdrop movement disabled. Functional transitions only.

---

## Project Structure

```
app/
  layout.tsx            # Root layout, metadata, schema.org Person, global components
  page.tsx              # One-page composition
  globals.css           # Design tokens, glitch + noise keyframes
  opengraph-image.tsx   # Custom OG image (edge runtime)
  sitemap.ts
  robots.ts

components/
  ui/
    CommandPalette.tsx  # ⌘K palette — navigation, contact, preferences
    ConsoleSignature.tsx # DevTools ASCII easter egg
    CustomCursor.tsx
    GlitchText.tsx
    HUD.tsx             # All 4 HUD corners incl. contact icon strip
    LenisProvider.tsx   # Smooth scroll + exposes window.__lenis
    PaletteTrigger.tsx  # Floating ⌘K pill button
    SectionWrapper.tsx  # Label typewriter + accent line draw
  hero/
    HeroSection.tsx
    ScrollIndicator.tsx
  three/
    AmbientBackdrop.tsx       # Fixed full-screen simplex noise shader
    AmbientBackdropLoader.tsx # SSR-safe dynamic wrapper
    HeroScene.tsx             # R3F icosahedron scene

  about/AboutSection.tsx
  credentials/CredentialsSection.tsx
  hackathons/HackathonsSection.tsx
  stack/StackSection.tsx
  work/WorkSection.tsx
  contact/ContactSection.tsx

lib/
  animations.ts           # EASE_OUT = [0.16,1,0.3,1] typed tuple, shared Variants
  hooks/
    useReducedMotion.ts
    useScrollProgress.ts

public/
  projects/
    climateroots.png    # ClimateRoots preview screenshot
    weekfive.png        # WeekFive preview screenshot
  cv.pdf                # TODO: add CV
```

---

## Design Tokens

```css
--bg-base:        #0a0a0a   /* page background */
--bg-raised:      #111111   /* cards */
--bg-overlay:     #1a1a1a   /* elevated surfaces */
--border:         #1f1f1f
--text-primary:   #ededed
--text-secondary: #a1a1a1
--text-tertiary:  #6b6b6b
--accent:         #00ff88   /* phosphor green — used sparingly */
--accent-dim:     rgba(0,255,136,0.15)
--danger:         #ff0055   /* glitch pseudo-elements only */
```

---

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

---

## Pending TODOs

- [ ] Add `public/cv.pdf`
- [ ] Update domain in `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts` once confirmed
- [ ] Fill in real project data in `components/work/WorkSection.tsx` (role, year already updated — verify dates)
- [ ] Add repo URLs for ClimateRoots and WeekFive once repos are public

---

## Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | 95+ |
| Lighthouse Accessibility | 100 |
| LCP | < 2.0s |
| CLS | < 0.05 |
| INP | < 200ms |

Hero 3D scene lazy-loads via `next/dynamic({ ssr: false })`. Ambient backdrop uses `powerPreference: "low-power"` and pauses when tab is hidden.

---

Built by [Santiago Arias Paul](https://github.com/SantiagoArias07) · [linkedin.com/in/santiago-arias-paul-49992b2b0](https://www.linkedin.com/in/santiago-arias-paul-49992b2b0/)
