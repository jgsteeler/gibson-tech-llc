<script setup lang="ts">
import { onMounted, ref } from "vue";

const theme = ref("dark");
const ready = ref(false);

onMounted(() => {
  theme.value = document.documentElement.getAttribute("data-theme") || "dark";
  ready.value = true;
});

function toggleTheme() {
  theme.value = theme.value === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", theme.value);
  localStorage.setItem("gtech-theme", theme.value);
}
</script>

<template>
  <button id="theme-toggle" class="theme-toggle-btn" aria-label="Toggle dark/light theme" :disabled="!ready" @click="toggleTheme">
    <span id="theme-icon">{{ theme === "dark" ? "☀️" : "🌙" }}</span>
    <span id="theme-text">{{ theme === "dark" ? "Light" : "Dark" }}</span>
  </button>
</template>
