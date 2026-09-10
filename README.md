# The Orchard Thieves — Website Makeover (WIP)

A component-by-component modern rebuild scaffold, built with Next.js 16 (App Router, React 19) + TypeScript + Tailwind CSS v4.

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## What's built so far

- `components/Navbar.tsx` — transparent nav over the hero, logo mark, links, "Order Now" CTA
- `components/Hero.tsx` — hero section with headline, CTAs, identity tags, and a crate-stamp visual motif
- `app/page.tsx` — composes the sections; a placeholder `#menu` section marks where the next component goes

## Design tokens (see `@theme` block in `app/globals.css`)

Tailwind v4 uses CSS-first configuration — no `tailwind.config.ts` file. Tokens live directly in `globals.css`:

- `parchment` #F6EFDF — page background
- `cream` #FFFBF3 — card/surface background
- `ink` #1E2B1A — primary text, deep orchard green (not pure black)
- `apple` #C23B2C — primary accent
- `crust` #E3A542 — secondary accent (crust/cheese gold)
- `sage` #7C9473 — supporting/muted tone

Fonts: `Fraunces` (display/headline) + `Work Sans` (body), loaded via `next/font/google` in `app/layout.tsx`.

## Design direction

Leans into the brand name itself — "Orchard Thieves" as playful mischief tied to fresh, raided-from-the-source ingredients — rather than generic wood-fired-pizzeria visual tropes. The crate-stamp badge and tag-shaped identity pills are a deliberate nod to produce-crate labeling, not decoration.

**To swap in before this goes further than a mockup:**
- Replace the Unsplash hero image with the client's own photography
- Confirm real founding year / "since" date, actual specialties (ingredients, dough process, signature items) to replace placeholder copy
- Menu section, location selector, and footer are not built yet — next components in the queue
