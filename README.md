# Dos Tacos — Website Refresh

Marketing site for **Dos Tacos**, an authentic taquería in Katy, TX (4.9★, 1,020 Google reviews).

Built with Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Motion.

---

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

---

## The four heroes

The whole point of this build: **four completely different hero concepts ship at once**, and you switch between them live from a floating control in the bottom-center of the home page. Your choice is saved to `localStorage`. Press **1–4** as a shortcut.

| # | Name | What it does |
|---|------|--------------|
| 1 | **Taco Cannon** | Full-bleed food imagery, giant kinetic headline that pops in letter by letter, ingredients floating in 3D parallax that drift away from your cursor, scrolling taco-name ticker. |
| 2 | **Build-A-Taco** | A bare tortilla that assembles itself as you scroll — meat, onion, cilantro, salsa fly in one layer at a time while the headline morphs and the background shifts through five colors. |
| 3 | **Lotería** | Vintage mercado poster. Animated papel picado banners, hand-drawn lotería cards, aged paper and halftone texture, Spanish-first copy. |
| 4 | **Color Block** | Three saturated panels (Tacos / Vegano / Bebidas) that expand as you hover, each a doorway into that part of the menu. |

Once you pick a winner, delete the other three from `src/components/heroes/` and render it directly in `src/app/page.tsx` instead of `<HeroSwitcher />`.

---

## Structure

```
src/
  app/            home, menu, about, reviews, catering, contact
  components/
    heroes/       the four hero variants + the SVG taco
    ui/           buttons, cards, marquee, section headings
    HeroSwitcher  hero picker (localStorage-backed)
    OrderProvider order modal — every "Order Now" on the site opens this
  data/
    site.ts       address, hours, phone, order links, reviews
    menu.ts       every menu item and price
    emoji.ts      stand-in art per dish
```

**All content lives in `src/data/`.** Change a price or an hour there and it updates everywhere.

---

## ⚠️ Before this goes live

These are placeholders I could not verify. Each is marked `NEEDS-CONFIRM` in the code.

| What | Where | Note |
|------|-------|------|
| **Ordering links** | `site.ts` → `order` | Currently point at ubereats.com / doordash.com homepages. Drop in the real store URLs. |
| **Phone number** | `site.ts` → `phone` | Google lists **(503) 935-0668** — a *503 Oregon* area code for a Katy, TX shop. Likely a call-tracking number or a listing typo. Worth confirming. |
| **Hours** | `site.ts` → `hours` | Only "opens 8 AM" was public. The closing times are assumed. |
| **Prices** | `menu.ts` | Items with `estimated: true` are mocked (they render with a small "TBC" tag). The prices visible on Uber Eats — drinks, mostly — are real. |
| **Email** | `site.ts` → `email` | `hola@dostacoskaty.com` is invented. The catering form emails this address. |
| **Socials** | `site.ts` → `socials` | Placeholder profile links. |
| **Catering packages** | `catering/page.tsx` | Package names and per-head pricing are invented starting points. |
| **About copy** | `about/page.tsx` | Written from review themes (free samples, vegan range), not from the real history. Needs the actual story. |
| **Food photography** | `src/data/emoji.ts` | Dishes currently use emoji as stand-in art. Real photos will lift this enormously. |

The catering form has **no backend** — it composes a pre-filled email via `mailto:`. To make it server-side, replace `handleSubmit` in `src/components/CateringForm.tsx` with a POST to a route handler or Formspree/Resend.

---

## Design system

Brand base is taken straight from the logo — salsa red, ink black, cream — with fiesta accents layered on for the chaos.

| Token | Value |
|-------|-------|
| `salsa` | `#ED1C24` |
| `ink` | `#0D0B0B` |
| `cream` | `#FFF6E5` |
| `lime` | `#A8E10C` |
| `mango` | `#FFB800` |
| `turquoise` | `#00C2CB` |
| `guava` | `#FF3D8B` |
| `mole` | `#6B2D1F` |

Type: **Anton** (display), **Luckiest Guy** (accents), **Outfit** (body).

Shared utilities live in `src/app/globals.css`: `.sticker` (the chunky outline + hard shadow used everywhere), `.grain`, `.halftone`, `.animate-marquee`, `.animate-wiggle`, `.animate-bob`, `.animate-sway`.

Motion respects `prefers-reduced-motion` globally.
