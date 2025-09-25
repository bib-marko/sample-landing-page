<template>
  <div class="fortune-container">
    <!-- 🎡 Image-based fruit roulette -->
    <FortuneWheel
      ref="wheelEl"
      style="width: 500px; max-width: 100%; margin-bottom: 3rem;"
      type="image"
      :useWeight="true"
      :verify="canvasVerify"
      :prizeId="prizeId"
      :angleBase="-2"
      :prizes="prizesImage"
      @rotateStart="onImageRotateStart"
      @rotateEnd="onRotateEnd"
    >
      <template #wheel>
        <img src="/img/wheel.png" style="width: 100%; transform: rotateZ(60deg)" />
      </template>
      <template #button>
        <img src="/img/button.png" style="width: 180px" />
      </template>
    </FortuneWheel>

    <!-- 🎨 Canvas-based color roulette -->
    <FortuneWheel
      ref="wheelCanvas"
      style="width: 500px; max-width: 100%;"
      type="canvas"
      :verify="true"
      :prizeId="colorPrizeId"
      :prizes="prizesColor"
      @rotateStart="onColorRotateStart"
      @rotateEnd="onColorRotateEnd"
    >
      <template #button>
        <button class="spin-btn">SPIN COLOR 🎨</button>
      </template>
    </FortuneWheel>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import FortuneWheel from 'vue-fortune-wheel'
import 'vue-fortune-wheel/style.css'

/** Prize interface */
interface PrizeImage {
  id: number
  name: string
  weight: number
  image: string
}

interface PrizeColor {
  id: number
  name: string
  background: string
  color: string
  probability: number
}

/* ---------- 🍌 Fruit Image Wheel ---------- */
const wheelEl = ref<InstanceType<typeof FortuneWheel> | null>(null)
const prizeId = ref<number>(0)
const canvasVerify = ref<boolean>(true)

const prizesImage: Ref<PrizeImage[]> = ref([
  { id: 1, name: 'Coconut', weight: 1, image: new URL('/img/coconut.png', import.meta.url).href },
  { id: 2, name: 'Rambutan', weight: 1, image: new URL('/img/dragonfruit.png', import.meta.url).href },
  { id: 3, name: 'Banana', weight: 1, image: new URL('/img/banana.png', import.meta.url).href }
])

function onImageRotateStart(rotateFn: () => void): void {
  const randomPrize = prizesImage.value[Math.floor(Math.random() * prizesImage.value.length)]
  prizeId.value = randomPrize.id
  rotateFn()
}
function onRotateEnd(prize: PrizeImage): void {
  alert(`Fruit Wheel: You won ${prize.name}`)
}

/* ---------- 🎨 Color Canvas Wheel ---------- */
const wheelCanvas = ref<InstanceType<typeof FortuneWheel> | null>(null)
const colorPrizeId = ref<number>(0)

const prizesColor: Ref<PrizeColor[]> = ref([
  { id: 1, name: 'Red', background: '#e84118', color: '#fff', probability: 5 },
  { id: 2, name: 'Blue', background: '#0097e6', color: '#fff', probability: 5 },
  { id: 3, name: 'Green', background: '#4cd137', color: '#fff', probability: 5 },
  { id: 4, name: 'Yellow', background: '#fbc531', color: '#333', probability: 5 },
  { id: 5, name: 'Purple', background: '#9c88ff', color: '#fff', probability: 55 },
  { id: 6, name: 'Orange', background: '#e58e26', color: '#fff', probability: 5 },
  { id: 7, name: 'Pink', background: '#fd79a8', color: '#fff', probability: 5 },
  { id: 8, name: 'Teal', background: '#00cec9', color: '#fff', probability: 5 },
  { id: 9, name: 'Brown', background: '#6D4C41', color: '#fff', probability: 5 },
  { id: 10, name: 'Gray', background: '#636e72', color: '#fff', probability: 5 }
])

function onColorRotateStart(rotateFn: () => void): void {
  const randomPrize = prizesColor.value[Math.floor(Math.random() * prizesColor.value.length)]
  colorPrizeId.value = randomPrize.id
  rotateFn()
}
function onColorRotateEnd(prize: PrizeColor): void {
  alert(`Color Wheel: You landed on ${prize.name}`)
}
</script>

<style scoped>
.fortune-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
}
.spin-btn {
  padding: 0.6rem 1.2rem;
  font-size: 1.2rem;
  border-radius: 8px;
  border: none;
  background: #2d3436;
  color: #fff;
  cursor: pointer;
}
.spin-btn:hover {
  background: #000;
}
</style>
