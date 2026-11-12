# Haven & Gable — Frontend A

A complete responsive home, garden, and outdoor living homepage built with
Next.js App Router, React, TypeScript, Tailwind CSS 4, and shadcn-compatible
component paths. The supplied approved mobile screenshot guides the hero,
branding, typography, colors, and initial section layout.

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm ci
npm run dev
```

Open http://localhost:3000. The homepage is the root route, not a component gallery.

## Checks and production output

```bash
npm run typecheck
npm run lint
npm run build
```

`next build` prerenders the homepage into `out/` using Next.js's static export.
Serve `out/` with any static host to preview the production build. `next start`
is not used with static exports. The app runs in Next.js via `npm run dev`.

## Homepage

1. Forest-green announcement bar
2. Haven & Gable header with responsive navigation and search
3. Immersive greenhouse hero, lower headline, stacked CTAs, curved bottom edge
4. Featured Guides
5. Browse by Category
6. Editor's Picks
7. Newsletter preview
8. Footer

Search filters local preview content. Category tiles filter Editor's Picks.
Guide cards open short frontend-only previews; there are no article template
routes. Newsletter submission validates the email locally and displays a preview
message. It does not save, subscribe, or send the address. No CMS, backend,
affiliate integration, ads, or analytics have been added.

## Components and styles

- Homepage: `components/homepage.tsx`
- SVG-clipped cards: `components/ui/notched-project-card.tsx`
- Branding: `components/brand.tsx`
- Local editorial preview content: `lib/content.ts`
- Styles and theme tokens: `src/styles/globals.css`
- Local image assets: `public/images/`
- Full-page review screenshots: `screenshots/mobile.png` (390px) and
  `screenshots/desktop.png` (1440px)

`components.json` maps shadcn UI components to `/components/ui`, with `@/`
resolving to the repository root. Keeping this folder ensures consistent shadcn
CLI output and imports. Tailwind 4 uses PostCSS and `@import "tailwindcss"`.
TypeScript, Tailwind, and Lucide are installed. Add future shadcn components with
`npx shadcn@latest add <component>`.

The supplied 21st.dev card implementation was adapted in its existing file. An
SVG clip cuts the image silhouette itself, with generous outside corners,
tangent fillets, and a concave circular pocket. The arrow and cut share a center;
CSS controls their size and the 6–9px radial clearance at each breakpoint. The
pocket is transparent, independent of the background color. Keyboard focus and
reduced-motion preferences are supported.

## Asset provenance

The three greenhouse images generated earlier in the conversation are reused:

| Local asset            | Original generated file                       |
| ---------------------- | --------------------------------------------- |
| greenhouse-small.webp  | exec-030f1416-b43a-4578-b4db-60ffb84c086d.png |
| greenhouse-mini.webp   | exec-fd2cf1d1-f0ea-47c3-bb8b-77b917325416.png |
| greenhouse-timber.webp | exec-6d1c74b7-468f-4fdb-b16a-56e6b8c20ce1.png |

Hero, garden, outdoor living, and outdoor cooking images were generated to fill
missing subjects and converted to local WebP assets. The hero photograph follows
the reference's composition; the screenshot did not include a separate original
hero image file. The house-and-leaf brand mark is recreated as SVG.

All work is limited to Frontend A. Further pages and integrations await approval.

## Frontend A refinements

Mobile Featured Guides use 12px titles, more vertical room, and a reserved strip
beside the unchanged notch. All card arrows share their full, keyboard-accessible
card links. Their inward hit areas are at least 44×44px; every category tile is
also larger than 44×44px. Other arrow actions have expanded hit areas, with a
separate 44px newsletter button target that does not overlap the email input.
The visible arrow discs, SVG notch construction, and 6–9px radial gaps are unchanged.

The approved photos are retained. `next/image` now emits responsive `srcset` and
`sizes` attributes using a static local loader. Smaller WebP variants are supplied
from 96px through 1280px, with the approved native image as the largest candidate.
Card images remain lazy-loaded and the hero remains prioritized. To rebuild
variants after an intentional source image change, install Pillow and run
`python scripts/generate-responsive-images.py`. The script never upscales images.

Full-page screenshots include `mobile-360.png`, `mobile.png` (390px),
`mobile-430.png`, and `desktop.png` (1440px). Viewport checks cover title fit,
no horizontal overflow, actual expanded arrow taps, all images loading, and
responsive image selection at standard and higher pixel densities.
