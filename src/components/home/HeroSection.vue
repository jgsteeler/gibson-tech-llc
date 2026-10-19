<script setup lang="ts">
import type { AppConfig } from "../../config/features";

defineProps<{ config: AppConfig }>();
</script>

<template>
<section class="hero hero-grid">
  <div class="hero-copy reveal">
    <p class="eyebrow">Enterprise Systems • Application Security • Cloud Modernization</p>
    <h1>
      Resilient Distributed Systems.<br />
      <span class="blue">Audit-Grade Security.</span><br />
      <span class="gold">Pragmatic Leadership.</span>
    </h1>
    <p class="lead">
      Gibson Tech advises engineering leaders on distributed systems architecture, application security, and cloud modernization. The work is practical: clarify system boundaries, strengthen identity and API controls, and help teams make sound decisions across the stack.
    </p>

    <div class="actions">
      <template v-if="config.flags.showDetailedHeroCta">
          <a class="button gold" href="#capabilities">Explore Consulting Services</a>
          <a class="button solid" :href="`mailto:${config.contactEmail}?subject=Gibson%20Tech%20Consulting%20Inquiry`">Initiate C2C Engagement</a>
      </template>
      <template v-else>
          <a class="button solid" href="#capabilities">Explore Capabilities</a>
          <a class="button ghost" :href="`mailto:${config.contactEmail}?subject=Gibson%20Tech%20Inquiry`">Email Johnny</a>
      </template>
    </div>
  </div>
</section>
</template>
