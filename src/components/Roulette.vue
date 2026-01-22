<template>
  <div class="machine-stage">
    <div id="fireworks-layer"></div>
      <div class="machine-scale">
    <div class="machine">
    <div class="machine-header" >
        <img src="/img/header.png" />
    </div>

      <div class="gift-machine-box-1">
        <div class="machine-title">You have {{ spinCount }} chance to win</div>
      </div>

      <div class="gift-machine-box-2"></div>

      <div class="gift-machine-box-3">
        <div class="gift-wrap">
          <div
            v-for="(_, i) in 9"
            :key="i"
            class="gift-box"
            :class="{
              active: i === currentIndex,
              showGift: showPrize
            }"
          >
            <div
              v-if="i !== 4"
              class="red-packets"
              :class="{
                'animate__animated animate__tada animate__infinite': i === currentIndex,
                // unactive: i !== currentIndex,
              }"
            >
                <span :class="
                    {
                        active: i === currentIndex,
                    }"
                >{{ i === currentIndex ? '': '₱'}}{{ rewards[i] }}</span>
            </div>

            <div v-else class="gift-btn" @click="startSpin">SPIN</div>
          </div>
        </div>
      </div>

      <div class="gift-machine-box-4"></div>

      <div class="gift-machine-box-5">
        
      </div>

       <div class="machine-footer" >
        <img src="/img/footer.webp" />
    </div>

    </div></div>

    <div class="other-img" >
        <img src="/img/tao.webp" class="tao" />
        <img src="/img/tree.webp" class="tree" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import 'animate.css'
import { Fireworks } from 'fireworks-js'
import Swal from 'sweetalert2'

export default defineComponent({
  name: "RedPacket",
  setup() {

    const spinCount = ref(1);
    const currentIndex = ref(-1);
    const finalIndex = ref(-1);
    const showPrize = ref(false);
    const spinning = ref(false);

    const rewards = ref<number[]>(Array(9).fill(0));

    let timer: number | null = null;

    const giftOrder = [0, 1, 2, 5, 8, 7, 6, 3];

      let fireworks: Fireworks | null = null

function startFireworks() {
  if (fireworks) return

  const container = document.getElementById('fireworks-layer')
  if (!container) return

  fireworks = new Fireworks(container, {
    autoresize: true,
    opacity: 1,                 // brighter
    acceleration: 1.03,
    friction: 0.97,
    gravity: 1.1,               // floaty
    particles: 140,
    traceLength: 4,
    traceSpeed: 10,
    explosion: 7,
    intensity: 32,
    flickering: 75,             // sparkle
    lineStyle: 'round',

    // 🌟 LIGHT COLORS
    hue: {
      min: 40,                  // gold
      max: 65                   // light yellow
    },

    delay: { min: 15, max: 30 },
    rocketsPoint: { min: 20, max: 80 }
  })

  fireworks.start()
}


function stopFireworks() {
  fireworks?.stop()
  fireworks = null
}


    function startSpin() {
      if (spinning.value) return;

      spinning.value = true;
      showPrize.value = false;
      finalIndex.value = -1;
        spinCount.value = 0;

      let step = 0;
      const total = Math.floor(Math.random() * 8) + 24;

      timer = window.setInterval(() => {
        currentIndex.value = giftOrder[step % 8];
        step++;
        if (step >= total) stopSpin();
      }, 120);
    }

    function stopSpin() {
    if (timer) clearInterval(timer);

    finalIndex.value = currentIndex.value;
    spinning.value = false;
    showPrize.value = true;

    rewards.value = rewards.value.map((_, i) => {
        if (i === finalIndex.value) {
        return 500; // 🎯 MAIN PRIZE ALWAYS ₱500
        }
        return Math.floor(Math.random() * (450 - 100 + 1)) + 100; // 🎲 ₱100–₱450
    });

    // ⏳ DELAY BEFORE FIREWORKS + MODAL
    setTimeout(() => {
        startFireworks();

        Swal.fire({
        title: "CONGRATULATIONS!",
        width: 500,
        confirmButtonText: "CLAIM NOW",
        text: "Your Welcome Bonus Spin rewarded you with a 200 + 300 bonus. Have fun and enjoy!",
        allowOutsideClick: false,
        customClass: {
            popup: 'redpacket-popup',
            title: 'redpacket-title',
            confirmButton: 'redpacket-confirm'
        }
        }).then((result) => {
        // 🛑 STOP FIREWORKS
        stopFireworks();

        if (result.isConfirmed) {
            window.location.href = "https://megabet-paradise.com/welcome-bonus";
        }
        });

    }, 1200); // ⏱ 1.2s delay (adjust as needed)
    }


    return {
      currentIndex,
      finalIndex,
      showPrize,
      startSpin,
      rewards,
      spinCount
    };
  },
});
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Bagel+Fat+One&family=Geist:wght@100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');
  /* PAGE CENTER */

*{
    font-family: 'Poppins';
}
.machine-stage {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding-top: 8rem;
}

/* 🔥 Auto scale to screen height */

.machine {
  width: 350px;
  max-width: 400px;
  position: relative;
  padding-top: 80px;

  animation: machine-float 3.5s ease-in-out infinite;
  filter:
    drop-shadow(0 12px 18px rgba(0, 0, 0, 0.35))
    drop-shadow(0 28px 45px rgba(0, 0, 0, 0.25));
}

@keyframes machine-float {
  0% {
    transform: translateY(0);
    filter:
      drop-shadow(0 12px 18px rgba(0, 0, 0, 0.35))
      drop-shadow(0 28px 45px rgba(0, 0, 0, 0.25));
  }

  50% {
    transform: translateY(-8px);
    filter:
      drop-shadow(0 20px 28px rgba(0, 0, 0, 0.45))
      drop-shadow(0 40px 60px rgba(0, 0, 0, 0.35));
  }

  100% {
    transform: translateY(0);
    filter:
      drop-shadow(0 12px 18px rgba(0, 0, 0, 0.35))
      drop-shadow(0 28px 45px rgba(0, 0, 0, 0.25));
  }
}

.other-img {
  position: absolute;
  left: 50%;
  bottom: 40%;
  transform: translateX(-50%);
  z-index: -1;
  width: 100%;
  height: 100px;
  pointer-events: none;
}

/* COMMON */
.other-img img {
  position: absolute;
  max-width: 350px;
  height: auto;
}

/* LEFT CHARACTER */
.tao {
  left: 50%;
  transform: translateX(-120%) rotate(-20deg);
}

/* RIGHT CHARACTER */
.tree {
  left: 50%;
  transform: translateX(20%) rotate(20deg);
  top: 120%;
}


#fireworks-layer {
  position: fixed;
  inset: 0;
  pointer-events: none; /* IMPORTANT */
  z-index: 1;
}

.machine-header {
  position: absolute;
  top: -21%;
  left: 49%;
  transform: translateX(-50%);

  z-index: 1;
  width: 130%;
  display: flex;
  justify-content: center;
}

.machine-header img {
  max-width: 90%;
  height: auto;
}


.machine-footer {
  position: absolute;
  bottom: -3%;
  left: 49%;
  transform: translateX(-50%);

  z-index: 1;
  width: 130%;
  display: flex;
  justify-content: center;
}

.machine-footer img {
  max-width: 90%;
  height: auto;
}

/* MACHINE */
/* .gift-machine-box-1,
.gift-machine-box-5{
  width:100%;
  border-radius:10px;
  background:#fb6853;
  text-align:center;
} */

.gift-machine-box-1 {
  position: relative;
  width: 100%;
  border-radius: 5px;
  background: #fb6853;
  text-align: center;
  overflow: hidden;
}

/* BORDER LAYER */
.gift-machine-box-1::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 4px; /* 🔥 thicker border */
  border-radius: inherit;

  background: linear-gradient(
    90deg,
    #fff2a8,
    #ffd700,
    #ff9f1c,
    #ffd700,
    #fff2a8
  );

  background-size: 400% 400%;
  animation: border-glow 2.5s linear infinite;

  /* MASK MAGIC */
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;

  /* ✨ GLOW */
  filter: drop-shadow(0 0 6px rgba(255, 215, 0, 0.9));

  z-index: 0;
}


/* CONTENT ABOVE BORDER */
.gift-machine-box-1 > * {
  position: relative;
  z-index: 1;
}

@keyframes border-glow {
  0% { background-position: 0% 50%; }
  100% { background-position: 300% 50%; }
}


.gift-machine-box-5{
  box-sizing:border-box;
  padding: 40px;
  width: 100%;
  height: 120px;
  border-radius:5px;
  background:#fb6853;
  text-align: center;
  color:#a2351e;
}

.machine-title {
  position: relative; /* required */
  display: inline-block;
  width: 80%;
  height: 40px;
  margin: 20px 0;
  border-radius: 20px;
  background: #5c1b17;
  color: #fff;
  line-height: 40px;
  border-top: 3px solid #a82a1b;
  overflow: hidden; /* hide glass edge */
}

.machine-title::after {
  content: "";
  position: absolute;
  top: 0;
  left: -150%;
  width: 60%;
  height: 100%;

  background: linear-gradient(
    120deg,
    transparent 0%,
    rgba(255, 255, 255, 0.25) 50%,
    transparent 100%
  );

  transform: skewX(-25deg);
  animation: glass-sweep 3.2s ease-in-out infinite;
}

@keyframes glass-sweep {
  0% {
    left: -150%;
  }
  45% {
    left: -150%;
  }
  100% {
    left: 150%;
  }
}
.gift-machine-box-2{
  position: relative;

  height: 20px;
  margin: 0 16px;
  background:#bb3e2a;
}
.gift-machine-box-2:before{
  content:"";
  position: absolute;
  left: -12px;
  width: 0;
height: 0;
border-style: solid;
border-width: 0 12px 20px 0;
border-color: transparent #bb3e2a transparent transparent;
}
.gift-machine-box-2:after{
  content:"";
  position: absolute;
  right: -12px;
  width: 0;
height: 0;
border-style: solid;
border-width: 20px 12px 0 0 ;
border-color: #bb3e2a transparent  transparent transparent;
}
.gift-machine-box-3 {
  position: relative;
  padding: .8rem;
  background: #bb3e2a;
  margin: 0 1rem;
  overflow: hidden;
}

.gift-machine-box-3::before,
.gift-machine-box-3::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px; /* border thickness */
  pointer-events: none;

  background: linear-gradient(
    180deg,
    #ffd700,
    #ff9f1c,
    #ffd700
  );

  background-size: 100% 300%;
  animation: side-glow 2.5s linear infinite;
}

/* LEFT */
.gift-machine-box-3::before {
  left: 0;
}

/* RIGHT */
.gift-machine-box-3::after {
  right: 0;
}

@keyframes side-glow {
  0%   { background-position: 50%   0%; }
  100% { background-position: 50% 300%; }
}

.gift-machine-box-4{
  position: relative;
  height: 20px;
  margin: 0 16px;
  background:#bb3e2a;
}
.gift-machine-box-4:before{
  content:"";
  position: absolute;
  left: -12px;
  width: 0;
height: 0;
border-style: solid;
border-width: 0 0 20px 12px;
border-color: transparent transparent #bb3e2a transparent;
}
.gift-machine-box-4:after{
  content:"";
  position: absolute;
  right: -12px;
  width: 0;
height: 0;
border-style: solid;
border-width: 20px 0 0  12px;
border-color: transparent  transparent transparent #bb3e2a;
}

.gift-machine-box-5{
  padding:1.5rem;
  color:#a2351e;
}

/* GRID */
.gift-wrap{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:.7rem;
  background:#6a211b;
  padding:.8rem;
  border-radius:10px;
  box-shadow:0 0 0 8px #b52314;
}

.gift-box{
  aspect-ratio:1;
  border-radius:6px;
  display:flex;
  justify-content:center;
  align-items:center;
}

.gift-box.active{ background:#fef2c2; }

/* RED PACKET */
.red-packets {
  display: inline-block;
  position: relative;
  width: 68px;
  height: 80px;
  background: #c52b21;
  vertical-align: middle;
  border-radius: 10px;
  overflow: hidden;
    box-shadow: inset 0 0 0.12em #00000044,
        0 0.11em 0.15em #0000008d;
        cursor: pointer;
}

.red-packets.unactive {
  filter: grayscale(20%) brightness(0.8);
  opacity: 0.7;
  pointer-events: none;
}
.red-packets:hover {
  filter: brightness(150%);
}

.red-packets::before{
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  border-style: solid;
  border-width: 27px 34px 0 34px;
  border-color: #d45232 transparent transparent transparent;
}

.red-packets span{
  position:absolute;
  inset:0;
  display:none;
  justify-content:center;
  align-items:center;
  font-size:1.2rem;
  color:#ffd700;
}

.showGift .red-packets span{ display:flex; }

/* BUTTON */
.gift-btn {
  width: 70%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    #fff6a3,
    #ffe74c 45%,
    #ffb703 70%,
    #d48806 100%
  );

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.6rem;
  font-weight: 700;
  color: #7a4a00;

  cursor: pointer;

  /* 3D SHADOW */
  box-shadow:
    inset 0 6px 8px rgba(255, 255, 255, 0.6),
    inset 0 -8px 12px rgba(0, 0, 0, 0.25),
    0 10px 18px rgba(0, 0, 0, 0.35),
    0 0 0 5px #ffb129;

    transition: transform 0.15s ease, box-shadow 0.15s ease;
    animation: spin-glow 2s ease-in-out infinite;
      caret-color: transparent;
}

.gift-btn:active {
  transform: translateY(4px);
  box-shadow:
    inset 0 4px 6px rgba(255, 255, 255, 0.5),
    inset 0 -4px 8px rgba(0, 0, 0, 0.35),
    0 4px 8px rgba(0, 0, 0, 0.3),
    0 0 0 5px #ffb129;
}


@keyframes spin-glow {
  0%, 100% {
    box-shadow:
      inset 0 6px 8px rgba(255, 255, 255, 0.6),
      inset 0 -8px 12px rgba(0, 0, 0, 0.25),
      0 10px 18px rgba(0, 0, 0, 0.35),
      0 0 0 5px #ffb129;
  }
  50% {
    box-shadow:
      inset 0 6px 8px rgba(255, 255, 255, 0.6),
      inset 0 -8px 12px rgba(0, 0, 0, 0.25),
      0 16px 26px rgba(0, 0, 0, 0.45),
      0 0 0 5px #ffd166;
  }
}


/* DESKTOP */
@media(min-width:768px){
  .machine{
    max-width:472px;
  }
}

.active {
    font-weight: bolder;
    font-size: 30px !important;
}


.redpacket-popup {
  border-radius: 20px !important;
  background: red !important;
  box-shadow: 0 20px 60px rgba(0,0,0,.4) !important;
  font-family: 'Poppins', sans-serif !important;
}

/* TITLE */
:global(.redpacket-title) {
    font-family: 'Poppins';
    font-size: 28px !important;
    font-weight: 800 !important;
    color: #FF8C26 !important;
    letter-spacing: 1px; 
}

/* BUTTON */
:global(.redpacket-confirm) {
  background: linear-gradient(135deg, #ffd166, #ff9f1c) !important;
  color: #7a4a00 !important;
  font-weight: 700 !important;
  border-radius: 12px !important;
  padding: 12px 28px !important;
  box-shadow: 0 6px 0 #d48806 !important;
}

:global(.swal2-html-container) {
    font-family: 'Poppins';
     color: #BA8966 !important;
}
:global(.redpacket-confirm:active) {
    font-family: 'Poppins';
  transform: translateY(2px);
  box-shadow: 0 4px 0 #d48806 !important;
}

</style>
