<script setup lang="ts">
import type { AppConfig } from "../../config/features";

defineProps<{ config: AppConfig }>();
</script>

<template>
<header class="topbar shell">
  <a href="/" class="brand-wrapper" aria-label="Gibson Tech, LLC">
    <!-- Desktop / Tablet: Full Logo with Tagline (Dark & Light) -->
    <img 
      src="/assets/brand_header_dark.jpg" 
      alt="Gibson Tech - Software Architecture, Application Security, Engineering Solutions" 
      class="brand-logo-desktop brand-logo-dark" 
    />
    <img 
      src="/assets/brand_header_light.jpg" 
      alt="Gibson Tech - Software Architecture, Application Security, Engineering Solutions" 
      class="brand-logo-desktop brand-logo-light" 
    />

    <!-- Mobile: Responsive Collapsed GT Monogram Icon -->
    <img 
      src="/assets/brand_icon.jpg" 
      alt="Gibson Tech GT Icon" 
      class="brand-logo-mobile" 
    />
  </a>

  <nav>
    <a href="#capabilities">Consulting</a>
    <a href="#leadership">Mentorship</a>
    <a v-if="config.flags.showDivergentFlowShowcase || config.flags.showWrenchQShowcase" href="#work">Selected Work</a>
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
    <a :href="config.linkedInUrl" target="_blank" rel="noopener" class="nav-linkedin-link">
      LinkedIn ↗
    </a>
    
    <slot />
  </nav>
</header>
</template>
