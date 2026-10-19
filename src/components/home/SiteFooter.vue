<script setup lang="ts">
import type { AppConfig } from "../../config/features";

defineProps<{ config: AppConfig }>();
</script>

<template>
<footer class="footer shell">
  <div>
    <strong>Gibson Tech</strong> — Software Architecture • Application Security • Engineering Solutions
    <div style="font-size: 0.8rem; margin-top: 0.3rem; opacity: 0.75;">
      © 2026 Gibson Tech. Topeka, Kansas.
    </div>
  </div>
  <div class="footer-links">
    <a v-if="config.flags.showDivergentFlowShowcase" :href="config.divergentFlowUrl" target="_blank" rel="noopener">Divergent Flow</a>
    <a v-if="config.flags.showWrenchQShowcase" :href="config.wrenchqUrl" target="_blank" rel="noopener">WrenchQ</a>
    <a href="https://gibsonsvc.com" target="_blank" rel="noopener">Gibson Service Co</a>
    <a :href="config.linkedInUrl" target="_blank" rel="noopener">LinkedIn</a>
    <a :href="`mailto:${config.contactEmail}`">{{ config.contactEmail }}</a>
  </div>
</footer>
</template>
