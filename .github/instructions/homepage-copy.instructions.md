---
description: "Use when writing, rewriting, or reviewing homepage copy in src/pages/index.astro; enforces Gibson Tech voice, CTA style, and forbidden phrasing. Trigger phrases: homepage copy, hero copy, CTA copy, rewrite index copy, landing page messaging."
applyTo: "src/pages/index.astro"
---

# Homepage Copy Rules

Use these rules for all public-facing copy in `src/pages/index.astro`.

## Voice and Messaging
- Write in a product-forward, confident tone that is concise and clear.
- Keep messaging anchored to the Universal Entity Engine (UEE), branded publicly as the Divergent Engine, and the Divergent Flow platform.
- Support dual audience messaging on the homepage:
	- Technical teams looking for architecture resilience
	- Local small businesses looking for rapid custom app delivery
- Prioritize outcomes, capabilities, and customer value over internal background detail.
- Preserve the existing technical, high-signal style; avoid fluffy or generic marketing language.

## Service Verticals and Audience
- Enterprise/platform copy should emphasize Entity-First architecture, resilience, and observability.
- Local-business consulting copy should emphasize rapid application development, workflow automation, and removal of manual bottlenecks.
- Describe quick-app engagements as precision software delivery, not low-value side projects.

## CTA Style
- Use direct action verbs at the start of CTA text (for example: `Explore`, `Start`, `See`, `Visit`, `Deploy`).
- Keep CTA labels short (about 2-6 words) and specific to the next action.
- Prefer one primary CTA and one secondary CTA per section when appropriate.
- Ensure CTA destinations and anchor text are consistent with the section promise.

## Forbidden Phrasing and Content
- Do not include legal/entity framing in public copy (for example: `LLC`, legal structure explanations, brand-vs-legal naming notes).
- Do not mention internal financial goals, including `Project 55`.
- Do not include internal-only operational context that is not customer-relevant.
- Do not use hype-heavy filler phrases (for example: `revolutionary`, `game-changing`, `best-in-class`) unless explicitly requested.

## Copy Quality Checks
- Keep headlines concrete and benefit-led.
- Keep paragraphs tight; prefer short sentences and scanning-friendly structure.
- Avoid repeating the same positioning claim across adjacent sections.
- When introducing acronyms, define once if needed and then use consistently.

## Palette Guardrails
- Preserve the existing homepage color variable system in `:root` (including `--royals-blue`, `--royals-gold`, and `--royals-powder`).
- Do not replace the current palette with black/gray defaults or unrelated themes.
- New visual accents should layer through opacity, blend modes, gradients, and texture treatment while staying within the established palette direction.
