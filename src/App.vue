<template>
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
</style>
