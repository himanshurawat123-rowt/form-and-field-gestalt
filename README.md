# FORM & FIELD

An editorial fashion storefront and interaction study built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Gestalt principles shape the shopping experience rather than appearing as standalone demonstrations.

## Run locally

```bash
npm install
npm run dev
npm run build
```

## Project structure

- `app/` — App Router entry point, metadata, typography, and design tokens.
- `components/sections/storefront.tsx` — Campaign, collection filters, garment rail, bag, and page composition.
- `components/sections/design-notes.tsx` — Concise notes mapping the eight principles to the interface.
- `components/sections/project-process.tsx` — Assignment brief, audience, wireframe, and iteration notes.
- `components/ui/product-rail-gallery.tsx` — Interactive clothing rail and accessible product detail dialog.
- `lib/products.ts` — Typed product catalogue used by the rail and shopping bag.

## Shopping interactions

Filter or search the collection, select a hanger to inspect a garment, choose a colour and size, add it to the bag, then adjust quantities or remove pieces. The experience is frontend-only; checkout displays a confirmation without submitting a transaction.

The rail supports pointer, touch, and keyboard interaction. Motion and scroll behavior respect `prefers-reduced-motion`.
