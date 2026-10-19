<script setup lang="ts">
import type { AppConfig } from "../../config/features";

defineProps<{ config: AppConfig }>();
</script>

<template>
<section id="capabilities" class="reveal delay-2">
  <p class="eyebrow">Architecture & Security Advisory</p>
  <h2 style="margin-top: 0.5rem; font-size: clamp(1.6rem, 3.2vw, 2.4rem);">Experienced Guidance for Critical Systems</h2>
  <p class="lead" style="margin-top: 0.8rem; margin-bottom: 1.6rem;">
    Independent advice for teams preparing for security reviews, assessing architectural risk, or planning system modernization.
  </p>

  <div class="grid">
    <!-- Pillar 1: AppSec -->
    <article class="card">
      <p class="eyebrow">Application Security</p>
      <h3>Application Security & Audit Readiness</h3>
      <template v-if="config.flags.showPenTestSprintPricing">
        <div class="price-tag">$3,500 – $5,000</div>
        <div class="rate-note">10–15 Hr Focused Sprint • 2-Wk Turnaround</div>
      </template>
      <p>
        Review API gateways, OAuth 2.0 PKCE flows, Okta CIAM migrations, and OWASP API risks. Identify and prioritize gaps before a penetration test or SOC 2 review, with practical remediation guidance.
      </p>
      <div class="badge-row">
        <span class="badge">OWASP Top 10</span>
        <span class="badge">OAuth 2.0 PKCE</span>
        <span class="badge">Audit Readiness</span>
      </div>
      <a v-if="config.flags.showPenTestSprintPricing" class="button ghost" style="margin-top: 1.2rem;" :href="`mailto:${config.contactEmail}?subject=Pen-Test%20Readiness%20Audit%20Inquiry`">Book Audit Sprint</a>
    </article>

    <!-- Pillar 2: Systems Architecture (Featured) -->
    <article :class="['card', { featured: config.flags.showFractionalRetainer }]">
      <p class="eyebrow" style="color: var(--royals-gold);">Systems Architecture</p>
      <h3>Principal Architecture Advisory</h3>
      <template v-if="config.flags.showFractionalRetainer">
        <div class="price-tag">$125 – $150 <span style="font-size: 1rem; font-weight: 500;">/ hr</span></div>
        <div class="rate-note">5 to 10 Hours / Week • Monthly Retainer</div>
      </template>
      <p>
        Get an experienced second opinion on monolith decoupling, cloud and API modernization, system boundaries, and event-driven design. Make critical architecture decisions with clear trade-offs and a path forward.
      </p>
      <div class="badge-row">
        <span class="badge">Onion Architecture</span>
        <span class="badge">CQRS & Events</span>
        <span class="badge">VP / Director Advisory</span>
      </div>
      <a v-if="config.flags.showFractionalRetainer" class="button gold" style="margin-top: 1.2rem;" :href="`mailto:${config.contactEmail}?subject=Fractional%20Architect%20Retainer%20Inquiry`">Retain Fractional Advisory</a>
    </article>

    <!-- Pillar 3: AI Mentorship & Enablement -->
    <article class="card">
      <p class="eyebrow">Engineering Leadership & AI</p>
      <h3>{{ config.flags.showAiWorkshopOffering ? "AI Engineering Workshop" : "AI-Era Engineering Mentorship" }}</h3>
      <template v-if="config.flags.showAiWorkshopOffering">
        <div class="price-tag">$3,500 – $4,500</div>
        <div class="rate-note">Half-Day Intensive • Team Playbooks</div>
      </template>
      <p>
        Help developers and teams use AI coding tools without losing design discipline. Build sound habits around SOLID principles, code review, and maintainable changes.
      </p>
      <div class="badge-row">
        <span class="badge">GitHub Copilot</span>
        <span class="badge">SOLID Governance</span>
        <span class="badge">Diagnostic Mobs</span>
      </div>
      <a v-if="config.flags.showAiWorkshopOffering" class="button ghost" style="margin-top: 1.2rem;" :href="`mailto:${config.contactEmail}?subject=AI%20Engineering%20Mentorship%20Workshop`">Schedule Team Workshop</a>
    </article>
  </div>
</section>
</template>
