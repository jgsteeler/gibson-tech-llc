# Gibson Tech CI/CD and Application Configuration Roadmap

Status: proposed cross-project standard, not an implemented shared platform.

Audience: Johnny Gibson and future Gibson Tech contributors.

## Purpose and boundaries

Establish a consistent delivery and configuration model for every Gibson Tech application,
including small marketing sites, proofs of concept, and production services. Projects may
use different hosting providers without inventing a different configuration process.

The immediate priority remains shipping consulting sites and useful products. This roadmap
does not authorize a hosting migration, Kubernetes rollout, or new platform dependency.
Adopt the conventions incrementally; shared services and infrastructure come later.

## Current situation

- Marketing sites and application UIs use Netlify; containerized backends use Fly.io.
- Configuration is spread across GitHub Actions, Netlify, Fly.io, application defaults,
  and checked-in deployment files.
- Some projects substitute values into TOML files in CI to supply Vite build variables.
- This repository has typed app configuration and feature flags, but not a shared flag,
  configuration, or secrets service.
- Release Please and release-gated Netlify deployment are being introduced here.
  Repository files alone do not activate the required credentials or provider settings.

This is manageable for a few development deployments, but duplication and unclear ownership
will become deployment and collaboration risks as products and environments grow.

## Minimum standard for every project

These are target conventions for new work and incremental adoption, not a claim that existing
projects already comply.

### Release and delivery

- Use Conventional Commits and SemVer, with Release Please maintaining release PRs,
  changelogs, version tags, and GitHub Releases.
- Preserve feature commit history using merge commits.
- Separate integration from publication: ordinary commits and feature merges do not
  automatically publish production deployments.
- Keep fast checks close to development. Apply appropriate tests, dependency checks, and
  security checks before release; do not defer all security feedback to production.
- Identify every deployed revision by its release tag, source commit, and, for containers,
  immutable image digest. Do not promote a moving `latest` tag as a release identity.
- Record deployment results and retain a tested rollback path to an earlier artifact and
  compatible configuration. Database migrations need their own compatibility/recovery plan.

The build executor is a per-project choice, not part of the release contract. GitHub can
build and upload to Netlify, or a release can trigger a controlled Netlify build. The latter
still uses Netlify build resources and cannot use Netlify's global "Stopped builds" setting.
A branch-based hook must resolve the intended release deterministically.

DAST needs a running candidate environment. A production deployment followed by a scan is
not a pre-publication security gate; preview deployment and promotion must be explicit.

### Classify settings before choosing tooling

| Class | Examples | Intended authority | Delivery |
|---|---|---|---|
| Non-secret application configuration | API base URL, product URL, environment name | Versioned configuration or an approved centralized configuration service, with clear ownership per key | Typed app configuration through a documented build-time or runtime adapter |
| Feature flags | Unreleased blog, staged workflow, experimental UI | Approved flag definitions and environment-specific values | One typed flag interface with explicit defaults and evaluation rules |
| Application secrets | Database credentials, private signing keys, backend API tokens | An approved secrets manager | Backend runtime identity or tightly scoped injection |
| Delivery credentials | Deployment token, registry publishing credential | CI secret store or approved secrets manager | Only the job that needs the credential; short-lived identity where supported |

One solution does not have to mean one product. Configuration, flag evaluation, and secrets
have different trust and availability requirements. Standardize the contract and authority
first, then select tools that satisfy each role.

### Centralized application configuration

- Expose settings through one typed configuration boundary per application. Components and
  services should not independently read provider variables or repeat fallback logic.
- Define the name, type, purpose, owner, sensitivity, environment scope, and build/runtime
  timing of each setting. Validate required settings and reject malformed values clearly.
- Use a single authoritative value per key and environment. Provider environment variables
  may be delivery copies, but not independently maintained competing sources.
- Document the adapter's precedence explicitly. Local overrides are for local development;
  they must not silently override approved production configuration.
- Use a logical scope such as application, environment, and service. Keep environment names
  consistent (`dev`, `stage`, `production`); aliases such as labs or beta are exposure channels
  unless explicitly defined as separate environments.
- Prefer native environment injection or structured configuration loading over pipeline string
  replacement in TOML files. Migrate existing substitutions deliberately rather than layering
  another replacement mechanism on top.
- Track configuration revisions with deployments. Audit changes and provide a rollback method.

### Feature flags

- Give each flag a typed key, owner, purpose, default, environment values, and removal or
  review condition. Keep configuration settings and secrets out of the flag catalog.
- Evaluate through a shared application interface, even while the provider is a local file.
  Adopt a cross-stack abstraction such as OpenFeature if it reduces coupling later.
- Keep unreleased commercial offers disabled by default. Define failure behavior per flag;
  an unavailable provider must not accidentally publish a gated offer or enable risky behavior.
- Feature flags are not authorization. Enforce permissions and entitlements on the backend.
  Never trust a browser flag to protect an API or sensitive data.
- Decide whether flags are evaluated during a static build, by a backend, or in a browser.
  A flag compiled into static HTML requires rebuilding to change its output. Browser toggles
  do not remove content already shipped in HTML or JavaScript.

### Secret management

- Never commit plaintext secrets, embed them in images, include them in public app config,
  or expose them through `VITE_*` or Astro `PUBLIC_*` variables. Those frontend prefixes are
  for public values, not secret storage.
- Prefer workload identity and short-lived credentials where the providers support them.
  Otherwise scope tokens narrowly and define owners, rotation, and revocation procedures.
- Separate development, staging, and production access. Contributors and CI jobs receive
  only the applications and environments they need.
- Keep secret values out of logs, build output, caches, release notes, and deployment metadata.
  Example environment files contain names and placeholders only.
- Use a managed synchronization/injection path when secrets must reach provider stores.
  Document direction and ownership; do not manually synchronize the same value across
  GitHub, Netlify, and Fly.io indefinitely.
- For future Kubernetes GitOps, choose a secrets operator or encrypted-file approach with
  separately protected decryption keys. Kubernetes Secret YAML with base64 values is not
  safe plaintext-Git storage.

### Frontend build-time versus runtime configuration

Vite normally replaces public environment values at build time. Moving a secret or URL to
a centralized store does not make an existing browser bundle update itself.

Choose one explicit model per application:

- **Build-time public configuration:** simple for static sites. Build separately for each
  environment; record the source commit and configuration revision for each artifact.
- **Runtime public configuration:** load an environment-specific public config document or
  endpoint. Validate it before using it, and plan caching, startup failures, and version
  compatibility. This can allow promoting the same UI image across environments.
- **Backend runtime configuration:** inject settings/secrets at runtime through the approved
  provider adapter, with explicit reload or restart behavior.

Runtime browser configuration is public. It must never become a proxy for reading secrets.
Security-sensitive operations belong behind an authenticated backend.

## Future container and GitOps direction

GitOps is an established industry approach, not a Blue Cross-specific term. Git declares
desired state, and a controller reconciles the deployment environment to that state.
Argo CD with Kustomize bases and environment overlays is a standard Kubernetes implementation.
YAML-driven push deployment alone does not provide continuous reconciliation.

The eventual target is:

1. CI tests the application and builds a container image once.
2. CI publishes the image to an OCI registry, recording its immutable digest.
3. An approved change updates the deployment repository's environment overlay to that digest
   and references the appropriate public configuration and secret sources.
4. Argo CD or Flux reconciles the cluster to the approved desired state.
5. Health checks and observability verify the rollout; rollback restores a compatible
   artifact/configuration revision.

Kustomize bases should contain shared Kubernetes resources. Overlays express intentional
environment differences such as replicas, resource limits, hostnames, image digests, and
configuration references. Avoid copying whole manifests for each environment.

A deployment repository may eventually span projects, but its layout, ownership, and
promotion permissions need evaluation before adoption. Secrets do not belong in overlays.
UI and backend co-location does not require giving them the same scaling or release cadence.
Static marketing sites may remain on a CDN rather than being containerized by default.

## Hosting options to evaluate later

These are architectural candidates, not current price quotes or selected vendors.

| Option | Fit | Trade-offs |
|---|---|---|
| Continue Netlify and Fly.io | Lowest disruption; Fly.io already deploys backend images | Provider-specific configuration remains; not the same Kubernetes/Argo CD model |
| Coolify or Dokploy on a VPS | Host UIs and backends together with application-oriented controls | Own server patching, backups, recovery, and platform upkeep; not a direct Kustomize/Argo CD equivalent |
| K3s with Argo CD or Flux on VPS infrastructure | Familiar Kubernetes resources, GitOps reconciliation, and overlays | Significant operational responsibility; a single server is not high availability |
| Managed Kubernetes, such as DigitalOcean Kubernetes or Civo | Kubernetes/GitOps with a managed control plane | Verify current pricing and features; still own application operations, worker sizing, ingress, storage, and recovery |
| OKD | Closest conceptual relationship to OpenShift | Likely excessive resource and operational overhead for the current stage |

Candidate configuration tools include versioned typed config for small projects and a
dedicated configuration service when runtime changes justify it. Feature flag candidates
include OpenFeature-compatible providers, Unleash, or Flagsmith. Secret-management candidates
include managed offerings such as Infisical or Doppler, or a self-operated option such as
OpenBao where its operational cost is justified. For Kubernetes, evaluate External Secrets
Operator or SOPS-based encrypted configuration as integration approaches, not standalone
substitutes for access control and key management.

Do not select a vendor from this list without verifying current licensing, pricing,
cross-stack support, access controls, audit capabilities, recovery, and provider integrations.

## Incremental adoption

### Now: document and reduce drift

- Keep shipping on the current providers; do not block product work on a platform migration.
- Finish and verify this site's release-driven workflow before using it as a template.
- Inventory existing keys, flags, secret locations, and TOML substitutions across projects.
  Record metadata, not secret values.
- Establish typed config boundaries and consistent environment naming as projects are touched.

### Next: standardize configuration with one pilot

- Choose one application and define its configuration/flag/secret inventory and precedence.
- Select the smallest toolset that supports its stacks, providers, local development, and
  future contributor access.
- Prove environment isolation, configuration validation, flag failure behavior, rotation,
  auditability, and rollback.
- Retire duplicate manual values and pipeline substitutions after verifying the replacement.
- Capture a reusable template with project-specific inputs, not a copied collection of
  credentials or a mandatory large platform.

### Later: pilot containerized GitOps

- Compare a VPS application platform with K3s or managed Kubernetes using actual workload,
  maintenance, recovery, and cost needs.
- Migrate one UI/backend pair, not the whole fleet.
- Prove TLS, authentication, routing, configuration injection, secrets, observability, backups,
  release promotion, and rollback before expanding.
- Revisit the decision when product demand, collaboration, or provider constraints justify it.

## Open decisions

- Shared configuration, flag, and secret providers; managed versus self-hosted.
- Runtime versus build-time frontend configuration per application.
- Registry, hosting provider, GitOps controller, and deployment repository structure.
- Recovery objectives, resource budgets, and preview/security-gate policy per product.
- How standards are enforced without making small projects expensive to maintain.

No hosting migration, new service, credential change, or application configuration rewrite
is implemented by this document.
