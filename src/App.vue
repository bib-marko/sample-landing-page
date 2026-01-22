<template>
   <Roulette />
</template>

<script setup lang="ts">
import Roulette from "./components/Roulette.vue";

</script>

<style>
:global(html, body) {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

body {
  background: url("/src/assets/bg-desktop.webp") no-repeat center center fixed;
  background-size: cover;
}

body::before {
  content: "";
  position: fixed;
  inset: -50%;
  pointer-events: none;
  z-index: 0;

  background:
    repeating-conic-gradient(
      from 0deg,
      rgba(255, 215, 0, 0.25),
      rgba(255, 215, 0, 0.05) 6deg,
      transparent 6deg,
      transparent 14deg
    );

  animation: sun-rotate 40s linear infinite;
  transform-origin: center;
  mix-blend-mode: screen;
}

body::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -1; /* BELOW RAYS */

  background: inherit;
  filter: blur(4px);
  transform: scale(1.08);
}
@keyframes sun-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

</style>
