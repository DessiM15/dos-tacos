# Dos Tacos — Website Refresh

Marketing site for **Dos Tacos**, an authentic taquería in Katy, TX (4.9 stars, 1,020 Google reviews).

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
| 1 | **Taco Cannon** | Full-bleed food imagery, giant kinetic headline that pops in letter by letter, illustrated ingredients floating in parallax that drift away from your cursor, scrolling taco-name ticker. |
| 2 | **Build-A-Taco** | A bare tortilla that assembles itself as you scroll — meat, onion, cilantro, salsa fly in one layer at a time while the headline morphs and the background shifts through five colors. |
| 3 | **Lotería** | Vintage mercado poster. Animated papel picado banners, hand-drawn lotería cards, aged paper and halftone texture, Spanish-first copy. |
| 4 | **Color Block** | Three saturated panels (Tacos / Desayuno / Antojitos) that expand as you hover, each a doorway into that part of the menu. |

All four are kept deliberately so the owners can demo them and pick. Once they choose, delete the other three from `src/components/heroes/` and render the winner directly in `src/app/page.tsx` instead of `<HeroSwitcher />`.

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
    site.ts       address, hours, phone, order links, socials, reviews
    menu.ts       every menu item and price
    images.ts     dish id -> photo mapping
  lib/
    seo.tsx       metadata helper + JSON-LD builders
```

**All content lives in `src/data/`.** Change a price or an hour there and it updates everywhere.

---

## ⚠️ Before this goes live

| What | Where | Note |
|------|-------|------|
| **Toast link address** | `site.ts` → `order.toast` | The Toast URL slug says **`26224-hunter-lane`**, but Google and Grubhub both say **10610 Gaston Rd**. Confirm this points at the right store before launch. |
| **DoorDash link** | `site.ts` → `order.doorDash` | Still the generic doordash.com homepage. Toast, Uber Eats and Grubhub are all real. |
| **Phone number** | `site.ts` → `phone` | Google lists **(503) 935-0668** — a *503 Oregon* area code for a Katy, TX shop. Likely call-tracking or a listing typo. |
| **Hours** | `site.ts` → `hours` | Only "opens 8 AM" was public. Closing times are assumed. |
| **Prices** | `menu.ts` | Everything with `estimated: true` is a placeholder (renders with a small "TBC" tag). Only the drink prices from Uber Eats are confirmed. |
| **Item names** | `menu.ts` | "El Pur", "El Bacon", "El Chorizo" come from the photo filenames — confirm the exact spelling on the printed menu. |
| **Email** | `site.ts` → `email` | `hola@dostacoskaty.com` is invented. The catering form emails this address. |
| **Catering packages** | `catering/page.tsx` | Package names and per-head pricing are invented starting points. |
| **About copy** | `about/page.tsx` | Written from review themes, not the real history. |
| **Missing photos** | `src/data/images.ts` | Al pastor, carnitas, crawfish tostada, soup du jour, all vegan items and all drinks have no photo yet and fall back to a coloured tile. |

The catering form has **no backend** — it composes a pre-filled email via `mailto:`. To make it server-side, replace `handleSubmit` in `src/components/CateringForm.tsx` with a POST to a route handler or Formspree/Resend.

---

## SEO

- `schema.org/Restaurant` JSON-LD on every page (rating, hours, address, price range, order action, socials) — this is what earns the rich result in Google.
- `schema.org/Menu` on `/menu` with every section and item priced, plus `BreadcrumbList` on `/menu` and `/contact`.
- Per-page titles, descriptions, canonical URLs, Open Graph and Twitter cards via `pageMetadata()` in `src/lib/seo.tsx`.
- Auto-generated `/sitemap.xml` and `/robots.txt`.
- Descriptive `alt` text on every photo, one `<h1>` per page, skip-to-content link.

**Set `NEXT_PUBLIC_SITE_URL`** in your host's environment variables once the real domain is live — everything canonical derives from it (it currently defaults to the Vercel URL).

---

## Photography

All dish photos in `/public/img/real/` are the restaurant's own, shot on the branded pink wrapper. No stock imagery is used anywhere, deliberately — mixing stock in would break that consistency. Items without a photo fall back to a coloured tile with an icon.

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
