# Project Guidelines

## Code Style
- Keep the implementation simple and Astro-native: pages/components in `.astro`, scoped styles, minimal dependencies.
- Prefer expressive typography and intentional visual direction over generic defaults; preserve the existing Technical Noir / Minimalist High-Tech language.
- Keep copy concise and product-forward. Do not add legal/entity framing to public-facing copy.

## Architecture
- The current site is a lean Astro marketing implementation with the homepage centered in `src/pages/index.astro`.
- Preserve the Entity-First architecture framing for UEE-related structures and keep Divergent Flow aligned with the Observability Loop concept.
- For larger updates, prefer extracting reusable sections into components rather than further expanding a single monolithic page.

## Build and Test
- Install dependencies: `npm install`
- Start local dev server: `npm run dev` (Astro default `http://localhost:4321`)
- Create production build: `npm run build`
- Preview production build: `npm run preview`
- Deployment target is Netlify using `netlify.toml` (`build.command = npm run build`, `publish = dist`).
- There is currently no automated test suite; when introducing non-trivial behavior, add focused tests or validation steps where practical.

## Conventions
- Public brand usage: refer to the business as `Gibson Tech` (or `G Tech` in UI branding) in public-facing code and copy.
- Do not include internal-only details in public surfaces:
  - Legal structure names/LLC framing
  - Financial goals (including Project 55)
  - Internal brand-vs-legal naming distinctions
- Public positioning should emphasize the Universal Entity Engine (UEE) and Divergent Flow platform.
- UEE means Universal Entity Engine; Gibson Tech's branded implementation of that concept is the Divergent Engine.
- Service vertical framing should support two audiences:
  - Enterprise and platform teams evaluating UEE architecture resilience
  - Local small businesses needing rapid app development and workflow automation
- When writing local-business consulting copy, position the offer as precision rapid delivery built on the same engineering discipline as the platform work.
- Visual accents should use assets in `/assets` as subtle atmospheric elements (texture, mask, glass layer), not dominant hero images.
- Keep `G Tech` branding prominent in the top-level header/navigation area.