# GitHub Copilot Instructions — Gibson Tech Works

These instructions provide clear, high-level guardrails for the `gibson-tech-llc` repository. Avoid multi-step procedural prescriptions or bloated prompt engineering. Keep edits scoped, deterministic, and aligned with the site's commercial mission.

## Core Mission & Positioning
- **Primary Purpose:** This is a high-impact marketing and lead-generation site for **Gibson Tech Works** (`gibsontechworks.com`), directing traffic to Johnny Gibson's senior consulting and C2C contracting offerings.
- **Tagline & Marketing Hook:** *"Gibson Tech Works. The technology just works—because good architecture works."*
- **Target Audience / Search Intent:**
  1. Engineering VPs and Directors whose developer teams are "vibe coding" isolated, fragile features and need architectural stewardship (SOLID principles, Onion Architecture).
  2. Engineering leaders preparing for third-party penetration test audits or SOC2 compliance (OAuth 2.0 PKCE, Okta CIAM, OWASP API Top 10).
  3. Organizations struggling with tangled legacy monoliths needing pragmatic systems architecture and decoupled event-driven services.
  4. Decision-makers with executive consulting ($125–$150/hr C2C) or senior architecture openings ($195k+).
- **Product Framing (Strict Guardrail):**
  - Do **NOT** pitch Divergent Flow, WrenchQ, or the Divergent platform as commercial SaaS products on this site.
  - Divergent Flow is framed strictly as a **Live Architectural Testbed** demonstrating full-stack execution (responsive React UI paired with a modern .NET / event-driven backend).
  - Internal software testbeds represent portfolio assets staged under the future **Gibson Holding Company** roadmap.

## Tech Stack & Architectural Simplicity
- **Framework:** Static site built with Astro and scoped components (`src/components/home/`).
- **Styling:** Centralized Kansas City Royals heritage palette (`src/styles/home.css`) with dark/light theme toggle.
- **Hosting:** Netlify via `netlify.toml` (`npm run build` -> `dist`). Basic static DNS with zero unnecessary edge or serverless overhead.
- **Simplicity First:** Keep components lightweight, readable, and Astro-native. Do not install heavy client-side UI libraries or complex runtime dependencies.

## Commercial Feature Flags (Strict Guardrail)
- Centralized configuration lives in `src/config/features.ts`.
- **Never Hardcode Pricing or Direct Booking CTAs:** All rates ($3,500 sprint, $125–$150/hr retainer, $3,500 workshop) and aggressive booking buttons must remain gated behind `config.flags` (`showPenTestSprintPricing`, `showFractionalRetainer`, `showAiWorkshopOffering`, `showDetailedHeroCta`).
- By default, the site runs in clean vanilla discovery mode.

## Voice & Style
- Grounded, direct, pragmatic peer voice.
- Zero corporate fluff, generic agency buzzwords ("synergistic", "paradigm", "cutting-edge"), or clinical jargon.
- Emphasize verified enterprise outcomes: ~25 years enterprise tenure, 0 audit findings on standardized security packages, and day-one C2C contracting readiness.
