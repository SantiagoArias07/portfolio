# Santiago Arias Paul — Portfolio

Personal portfolio site. Dark techy aesthetic, one-page scroll, built as a work sample.

**Live:** [portfolio-chi-ivory-84.vercel.app](https://portfolio-chi-ivory-84.vercel.app)  
**Contact:** santiago.ariasp.dev@gmail.com

---

## Preview

<div align="center">
  <!-- Upload screenshots to GitHub via Issues or Releases, then paste the user-attachments URLs below -->
  <!-- <img src="https://github.com/user-attachments/assets/TODO" width="48%" alt="Hero" />
  <img src="https://github.com/user-attachments/assets/TODO" width="48%" alt="About + Credentials" />
  <br/><br/>
  <img src="https://github.com/user-attachments/assets/TODO" width="48%" alt="Selected Work" />
  <img src="https://github.com/user-attachments/assets/TODO" width="48%" alt="Stack + Currently" /> -->
</div>

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

| # | Section | Notes |
|---|---|---|
| 01 | **Hero** | R3F distorted wireframe icosahedron, mouse-reactive rotation, glitch on name |
| 02 | **About** | Editorial 2/3 + metadata sidebar |
| 03 | **Credentials** | Gallagher Foundation + CODEX — active, with external links |
| 04 | **Selected Work** | ClimateRoots + WeekFive — screenshots, live URLs, repo links, clickable images |
| 05 | **Hackathons** | Capital One 2026, Gen Técnico 2025/2024, Technical Diploma, Programming Cert |
| 06 | **Stack** | Languages · Frontend · App & DB · Tooling · Currently Building With |
| 07 | **Contact** | Email + copy, GitHub, LinkedIn, CV |

---

## Interaction System

- **Custom cursor** — 8px dot → 24px hover → 36px crosshair on project cards. Mix-blend-difference.
- **HUD corners** — timestamp, Tec coords `25.6515° N, 100.2897° W`, scroll %, contact icon strip.
- **Command palette** — `⌘K` / `Ctrl+K` / `/` — navigation, copy email, links, CV download.
- **Section transitions** — mono label types in on scroll + accent line draws across viewport.
- **Glitch** — CSS clip-path on hero name at load and periodically.
- **Ambient backdrop** — full-screen simplex noise shader at 4% opacity. Pauses on tab-hidden.
- **Console signature** — styled ASCII + contact links on DevTools open.
- **`prefers-reduced-motion`** — all motion disabled, functional transitions only.

---

## Project Structure

```
app/
  layout.tsx            # Root layout, metadata, schema.org Person
  page.tsx              # One-page composition
  globals.css           # Design tokens, keyframes
  icon.tsx              # Custom favicon (S in accent green)
  opengraph-image.tsx   # OG image — edge runtime, 1200×630
  sitemap.ts / robots.ts

components/
  ui/    CommandPalette · ConsoleSignature · CustomCursor · GlitchText
         HUD · LenisProvider · PaletteTrigger · SectionWrapper
  three/ AmbientBackdrop · HeroScene
  hero / about / credentials / work / hackathons / stack / contact

lib/
  animations.ts          # EASE_OUT typed tuple, shared Variants
  hooks/                 # useReducedMotion · useScrollProgress

public/projects/         # climateroots.png · weekfive.png
```

---

## Design Tokens

```css
--bg-base: #0a0a0a  --bg-raised: #111111  --bg-overlay: #1a1a1a
--border:  #1f1f1f  --text-primary: #ededed  --text-secondary: #a1a1a1
--accent:  #00ff88  --accent-dim: rgba(0,255,136,.15)  --danger: #ff0055
```

---

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

---

## Pending

- [ ] Add `public/cv.pdf`
- [ ] Update `siteUrl` in `layout.tsx`, `sitemap.ts`, `robots.ts` when custom domain is live
- [ ] Upload Preview screenshots to GitHub and uncomment the Preview section above

---

Built by [Santiago Arias Paul](https://github.com/SantiagoArias07) · [LinkedIn](https://www.linkedin.com/in/santiago-arias-paul-49992b2b0/)
