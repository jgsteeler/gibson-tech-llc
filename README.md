# Gibson Tech (gibsontechworks.com)

Static Astro + Vue consulting site for Gibson Tech, focused on architecture, application security,
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

* **Static Architecture:** [Astro](https://astro.build/) handles routes, metadata, and static generation; [Vue 3](https://vuejs.org/) renders UI components in [src/components/](src/components/).
* **Styling:** Scoped CSS with Kansas City Royals heritage palette variables and local storage theme toggle (`src/styles/home.css`).
* **Deployment:** GitHub Actions builds released versions using `netlify.toml` and uploads `dist` to [Netlify](https://www.netlify.com/). Production deploys are gated on Release Please publishing a release.
* **Feature Flag Governance:** Centralized in `src/config/features.ts`. Pricing tags and direct booking CTAs remain off by default. Portfolio projects and the small-business consulting page are also disabled by default; build-time flags can publish each independently when ready.

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

### Browser smoke tests

Install Chromium once, then test a fresh production build:

```sh
npx playwright install chromium
npm run build
npm run test:e2e
```

Playwright starts and stops its own local production preview on port 4337. Tests cover
consulting messaging, section navigation, persisted themes, disabled pricing/booking offers,
feature-flagged portfolio and small-business surfaces, crawl metadata, browser errors, and
horizontal overflow. Each scenario runs in desktop and mobile Chromium. Google Fonts requests
are stubbed to keep these smoke tests independent of an external font service; they are not
visual/font regression tests.

Feature flags and optional public URLs are supplied to the GitHub Actions build from
repository Actions variables (`Settings > Secrets and variables > Actions > Variables`).
Only the exact value `true` enables a flag; missing, empty, or other values leave it off.
For local builds, set the same values in `.env.local`. These values are embedded in the
generated static site, so they are public build-time configuration—not secrets or runtime
controls. Changes apply after rebuilding and deploying.

- `VITE_SHOW_DETAILED_HERO_CTA`: show direct commercial calls to action.
- `VITE_SHOW_DIRECT_EMAIL_CAPTURE`: reserved for future hosted contact forms; currently has no UI effect.
- `VITE_SHOW_PEN_TEST_SPRINT_PRICING`: show the AppSec sprint pricing and booking CTA.
- `VITE_SHOW_FRACTIONAL_RETAINER`: show fractional retainer pricing and CTA.
- `VITE_SHOW_AI_WORKSHOP_OFFERING`: show the AI workshop offer and CTA.
- `VITE_SHOW_CLOUD_MIGRATION_PACKAGES`: show detailed cloud migration packages.
- `VITE_SHOW_DIVERGENT_FLOW_SHOWCASE`: show Divergent Flow in selected work, footer, and `llms.txt`.
- `VITE_SHOW_WRENCHQ_SHOWCASE`: show WrenchQ in selected work, footer, and `llms.txt`.
- `VITE_SHOW_SMALL_BUSINESS_CONSULTING`: generate `/consulting/` and include it in the sitemap.
- `VITE_SHOW_INTERACTIVE_CALCULATOR`: show the interactive budget/hours calculator.

Product URLs can be set with the GitHub repository variables `VITE_DIVERGENT_FLOW_URL` and
`VITE_WRENCHQ_URL`. The test suite checks the same variables used to create the production
build, so set them consistently for both commands when testing an enabled surface.

PR validation and release validation run the suite after building, without a Netlify
deployment. Browser reports, failure screenshots, and traces are retained as Actions
artifacts for seven days. Locally, use `npx playwright show-report` to inspect the HTML report.
The existing dependency audit runs first and can block the job before browser tests execute.

### Contact options

Email CTAs in the hero and the homepage contact section use `config.contactEmail` in
[features.ts](src/config/features.ts). The contact section includes a visible address for
visitors without a configured email app, plus a LinkedIn alternative. Email links open the
visitor's mail app; the site does not submit or store messages.

Basic contact remains available with all feature flags off. Pricing and direct booking
offers still follow their existing flags. Hosted forms and phone/SMS contact are deferred;
`VITE_SHOW_DIRECT_EMAIL_CAPTURE` is reserved and does not currently render a form.
Do not publish a personal phone number or add credentials to a mail link.

### Vue UI development

UI components use Vue single-file components with `<script setup lang="ts">` and templates.
Run `npm run check` for TypeScript and Vue template type checking; `npm run build` includes
this check so the existing CI Build gate also validates Vue components.
TypeScript is held to the 6.0 patch line because the current `vue-tsc` cannot load
TypeScript 7's compiler entry point. Reassess this constraint when upgrading Vue language tooling.
Astro pages own route generation, the HTML document, SEO metadata, and build-time configuration.
Configuration is passed into Vue components as typed props; static content is rendered to HTML
at build time, without shipping Vue or feature configuration to the browser.

Only [ThemeToggle.vue](src/components/home/ThemeToggle.vue) uses `client:load`. It demonstrates
Vue's `ref`, `onMounted`, event handling, and template bindings while retaining the existing
`gtech-theme` local storage preference. The head script still applies the saved theme before
rendering to prevent a flash of the wrong theme. Navigation, copy, contact links, and metadata
remain available without JavaScript. There is no SPA router, backend, or hosting change.

The optional consulting page is also rendered from Vue; its Astro route remains build-flagged.
Other applications require separate migrations in their own repositories. Portfolio descriptions
reflect the existing projects, not an assumption that those projects have already moved to Vue.

## Deployment

Netlify config is in `netlify.toml`.

- Build command: `npm run build`
- Publish directory: `dist`

### Releases and production deployment

[Release Please](https://github.com/googleapis/release-please) manages SemVer, release PRs,
the changelog, package versions, Git tags, and GitHub Releases. The first managed release is
`1.0.0`; the existing package version remains unchanged until that release PR is merged.
The archive tag `archive/copy-revamp-consulting-pr-2` preserves the original history of PR #2
and is not a versioned release.

Use Conventional Commits for individual commits:

- `fix: correct a navigation link` produces a patch release.
- `feat: add engineering articles` produces a minor release.
- `feat!: replace a public URL structure` or a `BREAKING CHANGE:` footer produces a major release.
- `docs:`, `chore:`, `ci:`, and `refactor:` describe maintenance work and ordinarily do not
  trigger a release on their own.

Use **Create a merge commit** for feature PRs to retain original commits. Release Please
reads those commits; a conventional PR title alone does not replace conventional commit
messages when using merge commits.

The [release workflow](.github/workflows/release.yml) runs on pushes to `main`:

1. Every push to `main` must pass Build, SAST, and Secrets validation before Release Please runs.
   Ordinary PRs targeting `main` run the same reusable validation workflow.
2. Normal merges create or update the pending release PR without deploying.
3. Merging the release PR validates the merged revision before publishing its version tag
   and GitHub Release. A failed build or scanner blocks release publication and deployment.
4. Only when Release Please reports a new release does the deploy job check out that exact
   tag and download the site artifact built and validated in the same workflow run.
5. Netlify CLI uploads that artifact with `--no-build --prod`; it does not rebuild the site.

The validation build uses `netlify build --offline --context production` to apply checked-in
production configuration from `netlify.toml` without deployment credentials. It does not fetch
dashboard-only Netlify variables. If public build configuration moves out of TOML, explicitly
provide it to the validation job rather than allowing the build and deployment to disagree.
This is not a Netlify build hook and does not request a hosted Netlify build.
Netlify hosting/deploy usage still applies, as do GitHub Actions usage limits.

#### Build and security gates

The [validation workflow](.github/workflows/validate.yml) runs three blocking jobs:

- **Build:** installs locked dependencies, runs `npm audit --audit-level=high`, and produces
  the static site artifact after desktop/mobile Playwright smoke tests pass. High/critical
  dependency advisories, audit errors, and browser test failures block release.
  Lower-severity advisories remain visible for triage; development dependencies are included.
- **SAST:** Semgrep Community Edition with `p/default`, `--error`, and `--strict`. Findings
  or scanner errors fail the job. Rules are fetched from the registry; scanning runs locally
  in the runner with metrics disabled and no Semgrep account/token.
- **Secrets:** pinned Gitleaks CLI scans all history reachable from the checked-out `HEAD`,
  with secret values redacted. It does not require a Gitleaks Action license or API token.

These are baseline checks, not proof of security. Semgrep coverage depends on supported
languages and rules; Astro templates and inline scripts are not guaranteed complete coverage.
Review them explicitly when changing data handling, HTML injection, or browser behavior.
The registry rules can evolve independently of the pinned engine. Do not suppress findings
or add broad secret allowlists merely to make a release pass; investigate and remediate first.

No security/deployment secrets are passed into PR validation, including fork PRs. Scanner
results are in job logs; this does not configure DAST or GitHub code-scanning/SARIF integration.

Dependabot alerts and automated security updates are enabled in repository settings.
The [Dependabot configuration](.github/dependabot.yml) adds weekly npm and GitHub Actions
update PRs once merged into the default branch. Routine npm minor/patch updates are grouped;
major upgrades stay separate. Updates are reviewed, not auto-merged. Dependabot does not
monitor the Docker image tags or the Netlify CLI version embedded in shell commands; review
those pins separately. Alerts help between releases, while the audit step gates publication.

#### One-time activation

- In GitHub **Settings > Actions > General > Workflow permissions**, enable **Allow GitHub
  Actions to create and approve pull requests**. The workflow grants its release job the
  required write permissions explicitly.
- Add repository Actions secrets `NETLIFY_AUTH_TOKEN` (a Netlify personal access token) and
  `NETLIFY_SITE_ID` (the existing project's ID). Do not commit token values.
- In Netlify **Project configuration > Developer settings > Continuous deployment > Build
  settings**, set **Build status** to **Stopped builds**. This stops Git-triggered production,
  branch, and PR preview builds while allowing direct uploads of the prebuilt site. Do not
  lock production publishing.
- Merge the automation changes to `main`, review the generated `1.0.0` release PR, and merge
  it when ready to publish.

These dashboard settings and secrets are not applied by committing this configuration.
Until Netlify builds are stopped, Git-triggered builds can still create duplicate deployments.

The workflow uses `GITHUB_TOKEN` and performs deployment in the same workflow because
events it creates generally do not start other workflows. Release Please-created PRs also
will not automatically start separate PR-check workflows with that token. If required checks
are added later, configure a suitably scoped GitHub App or PAT for Release Please, or arrange
explicit validation before merging its PR.

If a release is published but its deployment fails, fix the credentials/configuration and use
**Re-run failed jobs** on that workflow run. Re-running the whole workflow may no longer
report a newly created release, so the deploy job can be skipped.

### Product URLs

Product links are configured centrally in `src/config/features.ts` using build-time Vite
environment variables:

- `VITE_DIVERGENT_FLOW_URL`: `https://getdivergentflow.com`
- `VITE_WRENCHQ_URL`: `https://track.gibsonservice.co/`
- `VITE_SHOW_*`: feature flags documented above; unset flags are off

Set optional overrides as GitHub repository Actions variables for CI and deployment, or in
an uncommitted `.env.local` file for local builds. The application defaults remain available
when a URL variable is unset.

These URLs and flags are public build inputs, not secrets. Changing them requires a
rebuild/deploy. Never put credentials or private configuration in GitHub Actions variables
with a `VITE_` prefix; Vite embeds these values in the public site output. The small-business
page is omitted from static output and the sitemap unless its flag is enabled.

## Key Files

- [CI/CD and application configuration roadmap](docs/cicd-roadmap.md): Proposed cross-project
  release, feature flag, centralized configuration, secrets, and future GitOps standards.
- `src/pages/index.astro`: Main homepage content and styling
- `netlify.toml`: Netlify deployment settings
- `.github/copilot-instructions.md`: Workspace execution checklist and setup tracking
