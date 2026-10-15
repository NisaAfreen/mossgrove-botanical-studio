# Mossgrove Botanical Studio — demo website

A client-presentation demo for a combined **online plant shop**, **landscape design studio** and **garden inspiration** site.
"Mossgrove" is a temporary placeholder brand. All products, prices (₹), ratings, testimonials, projects and contact details are sample content.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

Requires Node 18+.

`npm run build:single` produces a single self-contained `dist-single/index.html` (JS and CSS inlined, in-memory routing) for hosting as a static preview; copy `public/images/` next to it.

## Stack

React 18 · TypeScript · Vite 5 · Tailwind CSS 3 · React Router 6 · Lucide icons. No backend.

## Creative direction

- **Concept:** an editorial "herbarium" — greenhouse-arch image frames, herbarium-style *specimen labels* (mono type, Latin names, sheet numbers) and hand-drawn botanical line art. These three details are the brand's signature.
- **Palette:** deep forest green, sage, warm ivory, linen beige, terracotta accents.
- **Type:** Instrument Serif (display), Hanken Grotesk (body/UI), IBM Plex Mono (labels).
- **Landscaping is a first-class section:** an interactive "service index" on the home page, a full landscaping page, and before/after transformation concepts.

## Features

- Shop with category filters, name search, sorting (popularity, newest, price, rating), in-stock toggle, loading and empty states
- Product cards with wishlist, quick-view dialog, availability and demo ratings
- Cart drawer: add, increase/decrease, remove, subtotal, delivery rule, total, live item count
- Cart and wishlist persist in `localStorage`
- Demo checkout with validation, error summary, order summary and a clearly labelled demo confirmation (no payment step)
- Garden planner: five questions → style, layout, four shop products, indicative budget, care rhythm, consultation CTA (pure frontend rules in `src/utils/planner.ts`)
- Before/after slider (drag, click or keyboard)
- Journal with article pages, newsletter with validation and success state, contact/consultation form pre-filled from CTAs
- Accessible dialogs (focus trap, Escape, focus restore), visible focus states, skip link, reduced-motion support, responsive down to 360px

## Where to change things

| What | File |
| --- | --- |
| Brand name, tagline, contact details, delivery rule | `src/config/brand.ts` |
| Logo mark | `src/components/ui/Botanical.tsx` (`Logo`) |
| Products, categories, prices | `src/data/products.ts` |
| Services, projects, articles, testimonials, brand values | `src/data/content.ts` |
| Planner rules | `src/utils/planner.ts` |
| Colours and fonts | `tailwind.config.js`, `index.html` (Google Fonts link) |
| Images | `public/images/*.webp` |

## Project structure

```
src/
  components/
    home/          HeroSection, CategoryShowcase, FeaturedPlants, GardenPlanner,
                   BenefitsSection, GardenJournal, Testimonials, Newsletter
    landscaping/   LandscapingServices, GardenPortfolio, BeforeAfter
    shop/          ProductCard, ProductGrid, ProductFilters, QuickViewModal, CartDrawer, SearchOverlay
    layout/        Navbar, Footer, Layout, PageHeader
    ui/            Modal, SmartImage (with fallback), Toaster, Botanical motifs, shared bits
  context/         StoreContext (cart, wishlist, UI state, toasts)
  data/            products.ts, content.ts
  hooks/           useLocalStorage, useReveal / useCountUp
  pages/           Home, Shop, Landscaping, Inspiration, Article, About, Contact, Checkout, Wishlist, Legal, 404
  types/           Product, CartItem, Category, Service, PlannerPreferences, Order, …
  utils/           format (₹, validation), planner
```

## Image credits

Photography from [Unsplash](https://unsplash.com) (Unsplash License), resized and saved locally as WebP. Before/after pairs show different spaces to illustrate the *type* of transformation and are labelled as such.
