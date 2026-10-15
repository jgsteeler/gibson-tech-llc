# GitHub Copilot Instructions — Gibson Tech

These instructions provide high-level guardrails for the `gibson-tech-llc` repository. Avoid multi-step procedural prescriptions or rigid prompt engineering. Keep edits scoped, deterministic, and aligned with the site's commercial mission.

## Core Mission & Positioning
- **Company & Brand:** The company is **Gibson Tech, LLC** (brand: **Gibson Tech**). The web home and domain is `gibsontechworks.com`.
- **Primary Purpose:** High-stature marketing and discovery site for Gibson Tech's enterprise consulting, AppSec audit defense, and fractional software architecture advisory.
- **Tone & First Impression:** Senior, authoritative, battle-tested engineering leadership (~25 years enterprise systems experience). The first impression should immediately convey technical depth, systems precision, and pragmatic execution.
- **Broad Market Inquiries (Do Not Pigeonhole Audience):**
  - We solve high-stakes software problems for anyone who needs them—from curious engineering managers, team leads, and startup founders to enterprise VPs, Directors, and recruiters sourcing elite architecture talent ($195k+).
  - Never restrict marketing copy or instructions to narrow archetypes. Keep the door wide open for any technical leader or business looking to improve their systems, de-risk an audit, or level up their team.
- **Product Framing (Strict Guardrail):**
  - Do **NOT** pitch Divergent Flow, WrenchQ, or the Divergent platform as commercial SaaS products on this site.
  - Divergent Flow is framed strictly as an **Architectural Proof of Execution** / live testbed demonstrating full-stack capability (responsive React front end paired with a modern .NET / event-driven backend).
  - Software testbeds represent portfolio assets staged under the future **Gibson Holding Company** roadmap.

## Tech Stack & Architectural Simplicity
- **Framework:** Static site built with Astro and scoped components (`src/components/home/`).
- **Styling:** Centralized Kansas City Royals heritage palette (`src/styles/home.css`) with dark/light theme toggle.
- **Hosting:** Netlify via `netlify.toml` (`npm run build` -> `dist`). Simple static deployment with zero runtime complexity, serverless baggage, or edge overhead.
- **Simplicity First:** Keep components lightweight, readable, and Astro-native.

## Commercial Feature Flags (Strict Guardrail)
- Centralized configuration lives in `src/config/features.ts`.
- **Never Hardcode Pricing or Direct Booking CTAs:** All rates ($3,500 sprint, $125–$150/hr retainer, $3,500 workshop) and aggressive booking buttons must remain gated behind `config.flags` (`showPenTestSprintPricing`, `showFractionalRetainer`, `showAiWorkshopOffering`, `showDetailedHeroCta`).
- By default, the site runs in clean vanilla discovery mode.

## Voice & Style
- Grounded, direct, pragmatic peer voice.
- Zero corporate fluff, generic agency buzzwords, or marketing hyperbole.
- Emphasize verified enterprise outcomes: ~25 years enterprise tenure, 0 audit findings on standardized security packages, and day-one C2C contracting readiness.
