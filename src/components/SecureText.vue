<template>
  <div class="secure-text">
    SECURE,
  </div>
</template>

<script setup lang="ts">
// nothing needed in script, just CSS + font import
</script>

<style scoped>
/* Import Lilita One from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Lilita+One&display=swap');

.secure-text {
  font-family: 'Lilita One', sans-serif;
  font-size: 80px;
  font-weight: 400;
  color: #58b327; /* main green color */

  /* Stroke */
  -webkit-text-stroke: 3px #ffffff;

  /* Bevel & Emboss simulation with multiple shadows */
  text-shadow:
    2px 2px 3px rgba(0, 0, 0, 0.35),   /* drop shadow */
    -2px -2px 3px rgba(255, 255, 255, 0.6), /* highlight (emboss effect) */
    0 0 12px rgba(255, 255, 255, 0.9), /* outer glow */
    0 0 20px rgba(255, 255, 255, 0.6); /* stronger glow */
  
  display: inline-block;
}
</style>
