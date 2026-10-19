<script setup lang="ts">
import type { AppConfig } from "../../config/features";

defineProps<{ config: AppConfig }>();
</script>

<template>
<section v-if="config.flags.showDivergentFlowShowcase || config.flags.showWrenchQShowcase" id="work" class="selected-work reveal delay-3">
  <p class="eyebrow">Selected Engineering Work</p>
  <h2 style="margin-top: 0.5rem; font-size: clamp(1.5rem, 2.5vw, 1.9rem);">Architecture in Practice</h2>
  <p style="margin-top: 0.6rem; margin-bottom: 1.2rem; color: var(--text-muted);">
    I build personal products to keep my architecture and full-stack development skills grounded in real delivery. These projects put my preferred Clean / Onion Architecture into practice, from domain boundaries and identity to the user experience.
  </p>

  <div class="grid">
      <article v-if="config.flags.showDivergentFlowShowcase" class="card">
        <img class="project-logo" src="/assets/divergent-flow.svg" alt="Divergent Flow" width="32" height="32" loading="lazy" />
        <h3>Divergent Flow</h3>
        <p>
          A personal product exploring observable workflows with React and modern .NET event-driven services.
        </p>
        <a class="project-link" :href="config.divergentFlowUrl" target="_blank" rel="noopener">Visit Divergent Flow ↗</a>
      </article>

      <article v-if="config.flags.showWrenchQShowcase" class="card">
        <img class="project-logo project-logo-dark" src="/assets/wrenchq_dark.JPG" alt="WrenchQ" width="1024" height="1024" loading="lazy" />
        <img class="project-logo project-logo-light" src="/assets/wrenchq_light.JPG" alt="WrenchQ" width="820" height="820" loading="lazy" />
        <h3>WrenchQ</h3>
        <p>
          A shop operations proof of concept for jobs, customers, and equipment, informed by real service workflows.
        </p>
        <a class="project-link" :href="config.wrenchqUrl" target="_blank" rel="noopener">Visit WrenchQ ↗</a>
      </article>
  </div>

</section>
</template>

<style scoped>
  .project-logo {
    width: 120px;
    height: 120px;
    object-fit: contain;
    border-radius: 6px;
    margin-bottom: 1rem;
  }

  .project-logo-dark {
    display: var(--logo-dark-display);
  }

  .project-logo-light {
    display: var(--logo-light-display);
  }

  .project-link {
    display: inline-block;
    margin-top: 1rem;
    color: var(--text-main);
    text-underline-offset: 0.2em;
  }
</style>
