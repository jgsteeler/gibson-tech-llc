<script setup lang="ts">
import type { AppConfig } from "../../config/features";

defineProps<{ config: AppConfig }>();
</script>

<template>
<section id="leadership" class="consulting-callout reveal delay-3">
  <p class="eyebrow">Engineering Leadership & Mentorship</p>
  <h2>Sound Engineering Judgment in the AI Era</h2>
  <p>
    AI coding tools can accelerate delivery, but they do not replace architectural judgment. Teams still need clear boundaries, reliable integrations, and maintainable systems.
  </p>
  <p>
    Gibson Tech helps engineering teams apply established design principles to AI-assisted work, review changes critically, and keep system quality in view as delivery accelerates.
  </p>
  <div class="actions">
    <a v-if="config.flags.showAiWorkshopOffering" class="button gold" :href="`mailto:${config.contactEmail}?subject=AI%20Engineering%20Mentorship%20Workshop`">Explore Team Workshop</a>
    <a v-else class="button ghost" :href="config.linkedInUrl" target="_blank" rel="noopener">Follow on LinkedIn ↗</a>
  </div>
</section>
</template>
