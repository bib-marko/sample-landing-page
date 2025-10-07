<template>
  <Landing />
</template>

<script setup lang="ts">
import { watchEffect } from "vue";
import { useOrientation } from "./service/orientation";
import Landing from "./components/Landing.vue";

const ORIENTATION_UTILS = useOrientation();
const IS_DESKTOP = ORIENTATION_UTILS.IS_DESKTOP;

watchEffect(() => {
  document.body.style.background = IS_DESKTOP.value
    ? 'url("/img/bg-desktop.png") no-repeat center center fixed'
    : 'url("/img/bg-mobile.png") no-repeat center center fixed';
  document.body.style.backgroundSize = "cover";
});
</script>

<style>
:global(html, body) {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
</style>

<!-- <template>
  <WheelOfFortune />
</template>

<script setup lang="ts">
import WheelOfFortune from './components/WheelOfFortune.vue'
</script>

<style>
/* 🎨 Full-page background */
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background: url("/img/bg-desktop.png") no-repeat center center fixed;
  background-size: cover;
  font-family: sans-serif;
}
</style> -->
