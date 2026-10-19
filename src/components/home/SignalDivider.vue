<script setup lang="ts">
withDefaults(defineProps<{ delay?: string }>(), { delay: "" });
</script>

<template>
<div :class="['signal-divider', 'reveal', delay]" aria-hidden="true">
  <span></span><span></span><span></span>
</div>
</template>
