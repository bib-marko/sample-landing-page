<template>
  <div class="desktop-temp">
    <div class="col-1">
      <img v-if="!IS_PORTRAIT" src="/img/details-desktop.png" class="details-desktop-img" />
      <img v-else src="/img/details-mobile.png" class="details-desktop-img" />

      <div v-if="IS_PORTRAIT" class="desc">
        <p>
          MAGLARO AT MANALO NG BONGGANG PAPREMYO, DITO LANG SA
          <a href="MEGABET-PARADISE.COM">MEGABET-PARADISE.COM</a>
        </p>
      </div>
      <img v-if="IS_PORTRAIT" src="/img/play-btn.png" class="play-btn" />
    </div>

    <div class="col-2">
      <img src="/img/logo.png" class="logo" />
      <div class="marquee">
        <div class="track">
          <span>{{ repeatedText }}</span>
          <span>{{ repeatedText }}</span>
        </div>
      </div>

      <div class="video-wrapper">
        <img src="/img/sample-video.gif" />
      </div>

      <div v-if="!IS_PORTRAIT" class="desc">
        <p>
          MAGLARO AT MANALO NG BONGGANG PAPREMYO, DITO LANG SA
          <a href="MEGABET-PARADISE.COM">MEGABET-PARADISE.COM</a>
        </p>
      </div>
      <img v-if="!IS_PORTRAIT" src="/img/play-btn.png" class="play-btn" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { computed } from "vue";
import { useOrientation } from "../service/orientation";

const ORIENTATION_UTILS = useOrientation();
const IS_PORTRAIT = ORIENTATION_UTILS.IS_PORTRAIT;

const repeatedText = computed(() => {
  return Array(6)
    .fill(
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    )
    .join(" • ");
});

// 🎶 Play background music on page load
onMounted(() => {
  const audio = new Audio("/music/music.mp3");
  audio.loop = true;
  audio.volume = 0.5; // adjust as needed

  // Try to play immediately
  audio.play().catch(() => {
    // If autoplay is blocked, wait for first user interaction
    const resume = () => {
      audio.play();
      document.removeEventListener("click", resume);
      document.removeEventListener("touchstart", resume);
    };
    document.addEventListener("click", resume);
    document.addEventListener("touchstart", resume);
  });
});
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lilita+One&display=swap');

:global(html, body) {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background: url("/img/bg-desktop.png") no-repeat center center fixed;
  background-size: cover;
}

/* 📱 MOBILE FIRST */
.desktop-temp {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
}

/* Children stacked */
.col-1,
.col-2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* ✅ Reverse order on mobile */
.col-2 {
  order: 1; /* top */
}
.col-1 {
  order: 2; /* bottom */
}

/* Responsive elements */

.details-desktop-img {
  width: 100%;
  max-width: 920px;
  height: auto;
}

.logo,
.play-btn,
.video-wrapper,
.marquee,
.desc {
  width: 100%;
  max-width: 540px;
  height: auto;
}

.logo {
  max-width: 60%;
}

.play-btn {
  max-width: 250vmin;
  animation: bounce 2s infinite;
}

.video-wrapper {
  position: relative;
  aspect-ratio: 16/9;
  border: 2px solid white;
  border-radius: 16px;
  overflow: hidden;
}

.video-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.marquee {
margin-bottom: 10px;
  width: 95%;
  overflow: hidden;
  background: #000000;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.51) 100%, rgba(0, 0, 0, 1) 100%);
  color: white;
  font-family: Arial, sans-serif;
  font-size: clamp(12px, 3.5vmin, 10px);
  padding: 0.5em;
  white-space: nowrap;
  border-radius: 16px;
  border: 2px solid white;
}

.track {
  display: inline-flex;
  animation: marquee 400s linear infinite;
}
.track span {
  padding-right: 2rem;
}

a,
.desc {
  font-family: 'Lilita One', sans-serif;
  color: white;
  text-align: center;
  font-size: clamp(14px, 4vmin, 22px);
  line-height: 1.2;
}

.desc p {
  margin: 0;
  padding: 0;
}

a:hover {
    text-decoration: underline;
}


@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-20px); }
  60% { transform: translateY(-10px); }
}

/* 🖥️ DESKTOP MODE */
@media (min-width: 1439px) and (orientation: landscape) {
    .desktop-temp {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        justify-items: center;
    }

    .col-1 {
        order: 1;
    }
    .col-2 {
        order: 2;
    }

    .logo {
        max-width: 50%;
    }

    .play-btn {
        width: 80vmin;
        margin-top: -50px;
    }

    .marquee {
          width: 75%;
        margin-top: -30px;
    }
    a,
    .desc {
        font-family: 'Lilita One', sans-serif;
        color: white;
        text-align: center;
        font-size: 4vmin;
        line-height: 1.2;   
        padding: 0.5em 0;  
        width: 680px;
        margin-top: -20px;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    .desc p {
        margin: 0 !important;
        padding: 0 !important;
    }
    

}

</style>
