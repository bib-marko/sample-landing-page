<template>
    <div class="desktop-temp"  :style="{
      background: IS_DESKTOP
        ? 'url(/img/bg-desktop.png) no-repeat center center fixed'
        : 'url(/img/bg-mobile.png) no-repeat center center fixed',
      'background-size': 'cover'
    }">
        <div class="col-1">
            <img src="/img/bonus/bonus-banner.png" class="details-desktop-img" />

            <div v-if="!IS_DESKTOP" class="desc">
                <p>
                MAGLARO AT MANALO NG BONGGANG PAPREMYO, DITO LANG SA
                <a href="https://megabet-paradise.com" target="_blank" rel="noopener noreferrer">MEGABET-PARADISE.COM</a>
                </p>
            </div>
            <img  @click="goToSite" v-if="!IS_DESKTOP" src="/img/bonus/mobile-btn.png" class="play-btn" />
        </div>

    <div class="col-2">
        <img v-if="IS_DESKTOP" src="/img/bonus/title.png" class="logo" />
        <img v-else src="/img/logo.png" class="logo" />
        <div class="video-wrapper">
            <video 
                ref="videoRef"
                autoplay 
                muted 
                loop 
                playsinline
                webkit-playsinline
                controlslist="nodownload nofullscreen noremoteplayback" 
                disablepictureinpicture 
                class="no-controls"
                >
                <source src="/video/video.mp4" type="video/mp4" />
            </video>
            <div class="controls">
                <img
                v-if="isMuted"
                src="/img/muted.png"
                class="control-btn"
                @click="toggleMute"
                />
                <img
                v-else
                src="/img/play.png"
                class="control-btn"
                @click="toggleMute"
                />
            </div>
        </div>

        <img v-if="!IS_DESKTOP" src="/img/bonus/title.png" class="logo" />

        <div v-if="IS_DESKTOP" class="desc">
            <p>
            MAGLARO AT MANALO NG BONGGANG PAPREMYO, DITO LANG SA
            </p>   <a href="https://megabet-paradise.com" target="_blank" rel="noopener noreferrer">MEGABET-PARADISE.COM</a>
        </div>
        <img  @click="goToSite" v-if="IS_DESKTOP" src="/img/bonus/desktop-btn.png" class="play-btn" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useOrientation } from "../service/orientation";

const videoRef = ref<HTMLVideoElement | null>(null);
const isMuted = ref(true); // start muted

const ORIENTATION_UTILS = useOrientation();
const IS_DESKTOP = ORIENTATION_UTILS.IS_DESKTOP;

const goToSite = () => {
  window.open("https://megabet-paradise.com", "_blank");
};

const toggleMute = () => {
  if (videoRef.value) {
    videoRef.value.muted = !videoRef.value.muted;
    isMuted.value = videoRef.value.muted;
  }
};

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lilita+One&display=swap');

/* :global(html, body) {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background: url("/img/bg-desktop.png") no-repeat center center fixed;
  background-size: cover;
} */

/* 
.bg-desktop {
  background: url("/img/bg-desktop.png") no-repeat center center fixed;
  background-size: cover;
}

.bg-mobile {
    margin: -.7rem;
    padding: 1rem;
    border: 2px solid red;
    background: url("/img/bg-mobile.png") no-repeat center center fixed;
    background-size: cover;
} */

.desktop-temp {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
}

.col-1,
.col-2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.col-2 {
  order: 1;
}
.col-1 {
  order: 2;
}

.details-desktop-img {
    margin-top: -2rem;
    width: 100%;
    max-width: 750px;
    height: auto;
}

.desc {
  margin-top: 10px;
  margin-bottom: 2em;
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
    margin-top: 2rem;
    margin-bottom: 1rem;
    max-width: 90%;
}

.play-btn {
  width: 100%;
  max-width: 370px;
  height: auto;
  margin-bottom: 3rem;
}


.play-btn {
    cursor: pointer;
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, .9));
    animation: bounce 2s infinite;
}

.video-wrapper {
  position: relative;
  aspect-ratio: 16/9;
  border: 2px solid white;
  border-radius: 16px;
  overflow: hidden;
}

.video-wrapper video {
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


.video-wrapper {
  position: relative;
  aspect-ratio: 16/9;
  border: 2px solid white;
  border-radius: 16px;
  overflow: hidden;
}

.video-wrapper video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.controls {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  gap: 8px;
}

.control-btn {
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: transform 0.2s;
}

.control-btn:hover {
  transform: scale(1.1);
}


.no-controls::-webkit-media-controls {
  display: none !important;
  -webkit-appearance: none;
}

.no-controls::-webkit-media-controls-enclosure {
  display: none !important;
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
        
        order: 2;
        
    }
    .col-2 {
        padding-top: 2em;
        /* padding-top: 2em;
        padding-bottom: 2em; */
        order: 1;
    }

    .logo {
          margin-top: -2rem;
    margin-bottom: 0;
        max-width: 80%;
    }

    .play-btn {
        width: 100%;
        max-width: 540px;
        height: auto;
        margin-bottom: 0;
    }

    .play-btn {
        cursor: pointer;
        width: 70vmin;
        filter: drop-shadow(0 0 20px rgba(255, 255, 255, .9));
    }


    .desc {
        width: 100%;
        max-width: 740px;
        height: auto;
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
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    .desc p {
        margin: 0 !important;
        padding: 0 !important;
    }
    
     .video-wrapper {
        margin-top: 1em;
        width: 700px;  
        max-width: 95%; 
    }


}


@media (max-width: 1440px) and (orientation: landscape) { 
 .col-1 {
        margin-top: 4rem;
        
    }
     .col-2 {
        margin-top: 4rem;
        
    }
}


/* Landscape fold mode */
@media screen and (max-width: 850px) and (orientation: landscape) {
 .desktop-temp {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        justify-items: center;
    }

    .col-1 {
        order: 2;
    }
    .col-2 {
        padding-top: 2em;
        order: 1;
    }

    .logo {
          margin-top: -2rem;
    margin-bottom: 0;
        max-width: 80%;
    }

    .play-btn {
        width: 100%;
        max-width: 540px;
        height: auto;
        margin-bottom: 0;
    }

    .play-btn {
        cursor: pointer;
        width: 70vmin;
        filter: drop-shadow(0 0 20px rgba(255, 255, 255, .9));
    }


    .desc {
        width: 100%;
        max-width: 740px;
        height: auto;
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
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    .desc p {
        margin: 0 !important;
        padding: 0 !important;
    }
    
    .video-wrapper {
        margin-top: 1em;
        width: 700px;  
        max-width: 95%; 
    }
}

</style>
