# Gibson Tech (gibsontechworks.com)

Static Astro consulting site for Gibson Tech, focused on architecture, application security,
and engineering advisory.

---

## 1. Core Positioning & Immediate Revenue Strategy
- Legal name: Gibson Tech, LLC
- Brand name: Gibson Tech / G Tech
- Primary purpose: Generate consulting and contracting leads
- Personal product work: Divergent Flow and WrenchQ demonstrate applied architecture and
  full-stack development without taking focus from consulting
- Pricing and direct engagement offers remain behind disabled feature flags

This site serves as the executive front door for Gibson Tech's consulting and advisory offerings. Its current objective is **not** to market or sell early-stage SaaS applications, shop tools, or developer frameworks, but to establish immediate credibility and drive high-margin Corp-to-Corp (C2C) advisory and contract architecture revenue:

* **AppSec & Pen-Test Audit Defense:** Eliminating third-party penetration test findings before auditors arrive; hardening OAuth 2.0 PKCE, Okta CIAM migrations, and OWASP API Top 10 boundaries across healthcare and financial backends.
* **Fractional Principal Architect Sounding Board:** Serving as a confidential, pragmatic sounding board for engineering leaders navigating monolith decoupling, Clean/Onion Architecture, and CQRS event streams.
* **"Vibe to Enterprise" AI Engineering Mentorship:** Interactive workshops and PR triage mobs coaching developer teams adopting GitHub Copilot and Cursor to move past isolated, brittle "vibe coding" into disciplined SOLID systems thinking.
* **Opportunistic Senior Roles:** Signaling availability for high-impact C2C consulting contracts ($125–$150+/hr) or elite remote software architect positions ($195k–$200k+).

---

## 2. Search Intent & Problem Spaces (Open Market Focus)

The site copy, metadata, and technical depth are calibrated to catch organic search and AI-assisted inquiries from any technical leader or decision-maker facing real-world software friction:

* **The Team Capability Gap:** Any manager, lead, director, or VP asking: *"How do I get my talented developers to see the system-wide architecture and stop creating isolated, buggy features with AI?"*
* **The Audit or Compliance Deadline:** Any organization—from venture-backed startups to mid-market enterprises—facing upcoming SOC2, HIPAA, or third-party penetration test audits and needing proven security packages that guarantee zero findings.
* **The Architecture Second Opinion:** Anyone struggling with a bloated monolith, messy integration boundaries, or a critical cloud/API gateway modernization who wants a battle-tested architect to come in, assess the terrain, and set them straight.
* **The Executive Search:** Hiring executives and senior recruiters looking for a language-agnostic senior problem solver with ~25 years of enterprise experience across high-stakes domains.

> **Audience Principle:** We do not pigeonhole into rigid corporate personas. Whether the inquiry comes from a curious engineering manager with a specific pain point, a non-technical founder needing architectural direction, or an enterprise VP overseeing a multi-million-dollar modernization, the value proposition remains the same: veteran, pragmatic problem solving that makes systems work.

---

## 3. The Big Picture: Gibson Holding Company & Software Testbeds

Within the long-range strategy (Project 55 and the Run & Gun architecture), Gibson Tech represents the immediate consulting cash-flow engine:

* **Gibson Holding Company (Roadmap Umbrella):** Staged to become the parent holding entity encompassing consulting services, physical field operations, and intellectual property.
* **Gibson Tech, LLC (Consulting Arm):** Generates active consulting revenue and drives immediate client ROI through hands-on technical stewardship.
* **Gibson Service Company, LLC (GSC Proving Ground):** Physical commercial repair operations acting as a real-world testbed for mobile workflows, offline sync, and domain-driven design.
* **Software Assets (Divergent Flow & WrenchQ):** De-emphasized on this site from commercial SaaS pitches into **Architectural Proofs of Execution**. Divergent Flow demonstrates a live, production-grade responsive React front end backed by a modern .NET / event-driven microservices architecture (and future candidate client for the Divergent platform).

---

## 4. Technical Stack & Operational Simplicity

The website architecture is intentionally kept minimal and rock-solid:

* **Static Architecture:** Built with [Astro](https://astro.build/) using component-driven sections in `src/components/home/`.
* **Styling:** Scoped CSS with Kansas City Royals heritage palette variables and local storage theme toggle (`src/styles/home.css`).
* **Deployment:** Hosted on [Netlify](https://www.netlify.com/) via `netlify.toml` with simple git-push deploys (`build = npm run build`, `publish = dist`). Zero runtime scaling complexity, serverless bloat, or edge overhead.
* **Feature Flag Governance:** Centralized in `src/config/features.ts`. All pricing tags ($3.5k–$5k sprint, $125–$150/hr retainer, $3,500 workshop) and direct booking CTAs are strictly guarded behind feature flags, keeping the live site in clean vanilla discovery mode until explicitly flipped.

---

## 5. Local Development & Build

```sh
# Install dependencies
npm install

# Start local Astro dev server (http://localhost:4321)
npm run dev

# Production build & preview
npm run build
npm run preview
```

## Deployment

Netlify config is in `netlify.toml`.

- Build command: `npm run build`
- Publish directory: `dist`

### Product URLs

Product links are configured centrally in `src/config/features.ts` using build-time Vite
environment variables:

- `VITE_DIVERGENT_FLOW_URL`: `https://getdivergentflow.com`
- `VITE_WRENCHQ_URL`: `https://track.gibsonservice.co/`

The current values are set in `[build.environment]` in `netlify.toml`. For local overrides,
set these variables in an uncommitted `.env.local` file or in the shell. Local development
otherwise uses the same current URLs as defaults.

These are public URLs, not secrets. Changing them requires a rebuild/deploy. When moving
configuration to the Netlify dashboard, remove the corresponding TOML entries so they do
not override dashboard values. Card and footer links use the same configuration and respect
the existing `showDivergentFlowLinks` and `showShopAppShowcase` flags.

## Key Files

- `src/pages/index.astro`: Main homepage content and styling
- `netlify.toml`: Netlify deployment settings
- `.github/copilot-instructions.md`: Workspace execution checklist and setup tracking
