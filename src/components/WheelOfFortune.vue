<template>
  <div class="main-container">
    <h1 class="title">Wheel of Fortune</h1>

    <div class="wheel-container">
      <canvas ref="wheelCanvas" width="500" height="500"></canvas>
      <img src="/img/button.png" class="spin-btn" @click="spinWheel" />
      <img src="/img/diamondRoulette/pointer.webp" class="arrow-pointer"  />
    </div>

    <div id="result" :class="{ show: showResult }" v-html="resultHtml"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"

const wheelCanvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)

const defaultSegments = [
  { msg: "Apple", prizeId: "1001", imageUrl: "/img/fruits/apple.png" },
  { msg: "Banana", prizeId: "1002", imageUrl: "/img/fruits/banana.png" },
  { msg: "Coconut", prizeId: "1003", imageUrl: "/img/fruits/coconut.png" },
  { msg: "Dragonfruit", prizeId: "1004", imageUrl: "/img/fruits/dragonfruit.png" },
  { msg: "Grapes", prizeId: "1005", imageUrl: "/img/fruits/grapes.png" },
  { msg: "Jackfruit", prizeId: "1006", imageUrl: "/img/fruits/jackfruit.png" },
  { msg: "Mangosteen", prizeId: "1007", imageUrl: "/img/fruits/mangosteen.png" },
  { msg: "Pitaya", prizeId: "1008", imageUrl: "/img/fruits/pitaya.png" },
  { msg: "Rambutan", prizeId: "1009", imageUrl: "/img/fruits/rambutan.png" },
  { msg: "Strawberry", prizeId: "1010", imageUrl: "/img/fruits/strawberry.png" },
]

const segments = ref([...defaultSegments])
const resultHtml = ref("")
const showResult = ref(false)

let currentAngle = 0
let spinVelocity = 0
let isSpinning = false

// slice colors (still needed for background)
const colorSchemes = [
  "#ff0000", "#ffffff", "#ff0000", "#ffffff", "#ff0000",
  "#ffffff", "#ff0000", "#ffffff", "#ff0000", "#ffffff"
]

// preload fruit images
const loadedImages: Record<string, HTMLImageElement> = {}
function preloadImages(): Promise<void[]> {
  return Promise.all(
    segments.value.map(
      seg =>
        new Promise<void>(resolve => {
          const img = new Image()
          img.src = seg.imageUrl
          img.onload = () => {
            loadedImages[seg.imageUrl] = img
            resolve()
          }
          img.onerror = () => resolve() // prevent blocking
        })
    )
  )
}

// draw the wheel
function drawWheel() {
  if (!ctx.value || !wheelCanvas.value) return
  const c = ctx.value
  const w = wheelCanvas.value.width
  const h = wheelCanvas.value.height
  const radius = Math.min(w, h) / 2
  const cx = w / 2
  const cy = h / 2
  const numSegments = segments.value.length
  const anglePerSegment = (2 * Math.PI) / numSegments

  c.clearRect(0, 0, w, h)

segments.value.forEach((seg, i) => {
  const startAngle = currentAngle + i * anglePerSegment - Math.PI / 2
  const endAngle = startAngle + anglePerSegment
  const bgColor = colorSchemes[i % colorSchemes.length]

  // slice
  c.beginPath()
  c.moveTo(cx, cy)
  c.arc(cx, cy, radius, startAngle, endAngle)
  c.fillStyle = bgColor
  c.fill()
  c.closePath()

  // fruit image rotated correctly
  const midAngle = startAngle + anglePerSegment / 2
  const img = loadedImages[seg.imageUrl]
  if (img) {
    const imgX = cx + Math.cos(midAngle) * (radius * 0.65)
    const imgY = cy + Math.sin(midAngle) * (radius * 0.65)

    c.save()
    c.translate(imgX, imgY)
    c.rotate(midAngle + Math.PI / 2)  // rotate with slice
    c.drawImage(img, -30, -30, 60, 60)
    c.restore()
  }
})


  // pointer
// 🔥 Black opacity gradient in the middle
  const gradient = c.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.4)
  gradient.addColorStop(0, "rgba(0,0,0,0.6)") // dark center
  gradient.addColorStop(1, "rgba(0,0,0,0)")   // fades out
  c.fillStyle = gradient
  c.beginPath()
  c.arc(cx, cy, radius * 0.4, 0, 2 * Math.PI)
  c.fill()

  // pointer
  c.beginPath()
  c.moveTo(cx, cy - radius - 10)
  c.lineTo(cx - 15, cy - radius - 40)
  c.lineTo(cx + 15, cy - radius - 40)
  c.fillStyle = "#333"
  c.fill()
}

// spin logic
function spinAnimation() {
  if (!isSpinning) return
  currentAngle += spinVelocity
  spinVelocity *= 0.98
  if (spinVelocity < 0.01) {
    spinVelocity = 0
    isSpinning = false
    findWinner()
  }
  drawWheel()
  requestAnimationFrame(spinAnimation)
}

function spinWheel() {
  if (isSpinning) return
  showResult.value = false
  spinVelocity = Math.random() * 0.3 + 0.25
  isSpinning = true
  spinAnimation()
}

function findWinner() {
  const numSegments = segments.value.length
  const anglePerSegment = (2 * Math.PI) / numSegments
  let normalized = currentAngle % (2 * Math.PI)
  if (normalized < 0) normalized += 2 * Math.PI
  normalized = (normalized - Math.PI / 2 + 2 * Math.PI) % (2 * Math.PI)

  const winningIndex =
    (numSegments - Math.floor(normalized / anglePerSegment) - 1) % numSegments
  const winner = segments.value[winningIndex]

  resultHtml.value = `
    <div>The result is:</div>
    <div class="result-content">
      <img src="${winner.imageUrl}" width="50" height="50" />
      <span>${winner.msg}</span>
    </div>
  `
  setTimeout(() => {
    showResult.value = true
  }, 300)
}

onMounted(async () => {
  if (wheelCanvas.value) {
    ctx.value = wheelCanvas.value.getContext("2d")
    await preloadImages()
    drawWheel()
  }
})
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}
.wheel-container {
  position: relative;
  width: 500px;
  height: 500px;
  transform: rotate(270deg);
padding: 37px;
  /* 🔥 Add background */
  background: url("/img/wheel.png") no-repeat center center;
  background-size: cover; /* scale image to fit */
}

.spin-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
}
#wheelCanvas {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
#result {
  transition: all 0.6s;
  opacity: 0;
}
#result.show {
  opacity: 1;
}
.result-content {
  display: flex;
  align-items: center;
  gap: 8px;
}
.arrow-pointer {
  position: absolute;
  top: 43%;        /* adjust vertically */
  left: 90%;         /* center horizontally */
  transform: translateX(-50%);
  width: 50px;       /* adjust size */
  height: auto;
  z-index: 1;       /* make sure it’s above canvas */
  transform: rotate(90deg);
}

</style>
