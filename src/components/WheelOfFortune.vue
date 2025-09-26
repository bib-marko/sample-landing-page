<template>
  <div class="main-container">
    <h1 class="title">Wheel of Fortune</h1>

    <div class="wheel-container">
     <div class="canvas-wrapper">
    <canvas ref="wheelCanvas"></canvas>
  </div>
  <img src="/img/button.png" class="spin-btn" @click="spinWheel" />
  <img src="/img/diamondRoulette/arrow.png" class="arrow-pointer" />
    </div>

    <div id="result" :class="{ show: showResult }" v-html="resultHtml"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import confetti from "canvas-confetti"

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
    c.drawImage(img, -30, -45, 60, 60)
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
    </div>
  `
  setTimeout(() => {
    showResult.value = true
    launchFireworks()
    // launchSchoolPride()
  }, 300)
}

function launchFireworks() {
  const duration = 15 * 1000
  const animationEnd = Date.now() + duration
  const defaults = { 
    startVelocity: 30, 
    spread: 360, 
    ticks: 60, 
    zIndex: 9999,
    scalar: 1 // 🌟 make confetti much bigger
  }

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    const particleCount = 100 * (timeLeft / duration)
    // since particles fall down, start them high
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
    })
  }, 250)
}

// function launchSchoolPride() {
//   const colors = ["#bb0000", "#ffffff"] // 🎨 school colors

//   ;(function frame() {
//     confetti({
//       particleCount: 4,
//       angle: 60,
//       spread: 55,
//       origin: { x: 0 }, // left side
//       colors,
//       scalar: 1, // bigger confetti
//     })

//     confetti({
//       particleCount: 4,
//       angle: 120,
//       spread: 55,
//       origin: { x: 1 }, // right side
//       colors,
//       scalar: 1,
//     })

//     requestAnimationFrame(frame) // ♾️ loop forever
//   })()
// }


onMounted(async () => {
  if (wheelCanvas.value) {
    ctx.value = wheelCanvas.value.getContext("2d")

    function resizeCanvas() {
      if (!wheelCanvas.value) return
      const parent = wheelCanvas.value.parentElement
      if (!parent) return

      // match container size
      const size = parent.clientWidth
      wheelCanvas.value.width = size
      wheelCanvas.value.height = size
      drawWheel()
    }

    window.addEventListener("resize", resizeCanvas)
    await preloadImages()
    resizeCanvas() // initial sizing
  }
})

</script>

<style scoped>
/* ✅ Base (mobile-first) */
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
}

.wheel-container {
  position: relative;
  width: 100%;
  max-width: 360px;   /* mobile default */
  aspect-ratio: 1/1;  /* keeps it square */
  margin: 0 auto;
  background: url("/img/wheel.png") no-repeat center center;
  background-size: cover;
  border-radius: 50%;
  transform: rotate(270deg);

}

.canvas-wrapper {
  width: 87%;
  height: 87%;
  padding-top: 6.5%;
  padding-left: 6.5%;
  box-sizing: border-box;

}

#wheelCanvas {
  width: 100%;
  height: 100%;
   display: block;
  border-radius: 50%;
}

.spin-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  cursor: pointer;
}

.arrow-pointer {
  position: absolute;
  top: 45%;
  left: 93%;
  transform: translateX(-50%) rotate(90deg);
  width: 25px;
  height: auto;
  z-index: 2;
}

/* ✅ Tablet Portrait (720px–1280px) */
@media (min-width: 720px) and (max-width: 1280px) and (orientation: portrait) {
  .wheel-container {
    max-width: 400px;
  }
  .spin-btn {
    width: 80px;
    height: 80px;
  }
  .arrow-pointer {
    width: 35px;
    top: 44%;
  }
}

/* ✅ Tablet Landscape (768px–1438px) */
@media (min-width: 768px) and (max-width: 1438px) and (orientation: landscape) {
  .wheel-container {
    max-width: 450px;
  }
  .spin-btn {
    width: 90px;
    height: 90px;
  }
  .arrow-pointer {
    width: 35px;
     top: 44%;
  }
}

/* ✅ Desktop Wide (≥1439px landscape) */
@media (min-width: 1439px) and (orientation: landscape) {
  .wheel-container {
    max-width: 500px;
  }
  .spin-btn {
    width: 100px;
    height: 100px;
  }
  .arrow-pointer {
    width: 35px;
  }
}

/* ✅ Square-ish screens (aspect ratio 4:5 ~ 5:4) */
@media (min-aspect-ratio: 4/5) and (max-aspect-ratio: 5/4) {
  .wheel-container {
    max-width: 326px;
  }

   .arrow-pointer {
    width: 25px;
  }
}

</style>
