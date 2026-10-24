# Powerhouse Building Solutions — Corporate Website

Production-quality, multi-page corporate website for **Powerhouse Building Solutions** (Pakistan) — electrical, lighting, building automation, switchgear, security and Hi-Fi/AV solutions.

Built with **Next.js 14 (App Router) + Tailwind CSS**. Fully static (SSG) — deployable on Vercel with zero configuration.

## Live content source

All categories, brands, addresses, phone numbers and hours come from the real company site ([powerhouse.com.pk](https://powerhouse.com.pk)). Products operate on a **request-a-quote** model, so no prices are listed anywhere — matching the real business.

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero carousel, animated stats, category showcase, why-us, featured products, brand marquee, projects, testimonials, CTA |
| `/products` | Full catalogue explorer — live search, category/brand filters, sorting, pagination |
| `/products/[category]` + `/products/[category]/[subcategory]` | All 10 categories with real sub-category pages |
| `/product/[slug]` | 66 product detail pages — zoom gallery, specs table, spec-sheet download, related products, JSON-LD |
| `/projects` + `/projects/[slug]` | Sector-filtered projects with case-study galleries |
| `/brands` | 24 featured brands with category filtering |
| `/about` | Story, Plan·Select·Install·Support process, values, teams |
| `/services` | Planning & design, installation & wiring, maintenance |
| `/contact` | Validated enquiry form, 3 locations, map embed, hours, FAQ |
| `/quote` | Add-to-quote basket with header counter, qty edit, submit form |
| `/news` + `/news/[slug]` | Guides journal with Article JSON-LD |
| `/careers` | Job listings with mailto applications |
| `/sitemap.xml` `/robots.txt` | SEO infrastructure |

## Features

- Instant site-wide search (products, categories, brands, pages) with keyboard navigation
- Quote basket persisted in `localStorage`, counter badge in header
- Sticky header with desktop mega-menu + mobile hamburger
- Scroll-reveal animations, animated counters, marquee — all respecting `prefers-reduced-motion`
- WhatsApp floating button, back-to-top, breadcrumbs everywhere
- Newsletter signup, SEO metadata + Open Graph + Organization/Product/Article JSON-LD
- Accessible: semantic HTML, ARIA labels, keyboard navigation, focus-visible styles

## Design system

- **Light theme** — white/soft-grey surfaces, navy `#0b1836` primary, amber `#ffa61a` accent
- **Typography** — Playfair Display (headings) + Inter (body) via `next/font`
- 12-column grid, 80rem container, rounded cards, three shadow tokens
- Data-driven: **all content lives in `src/data/*.json`** — edit JSON to update products, brands, projects, FAQs, blog, careers. No code changes needed.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (165 static pages)
npm run start    # serve the production build
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. At [vercel.com/new](https://vercel.com/new) import the repo — framework preset **Next.js** is auto-detected; no config needed.
3. Deploy. (Or run `npx vercel` locally.)

## Image credits

Category/hero photography from the reference site's public assets and [Unsplash](https://unsplash.com) (license-free). Product images are contextual placeholders — replace `image` URLs in `src/data/products.json` with real product photos when available. Remote hosts are whitelisted in `next.config.mjs` (`images.remotePatterns`).

## Structure

```
src/
  app/          → routes (App Router) + sitemap/robots/icon
  components/   → header, footer, cards, explorers, forms, quote provider…
  data/         → site, categories, products, brands, projects, blog, faqs, careers, testimonials (JSON)
  lib/data.js   → typed helpers + search over the JSON layer
```
