<template>
  <section ref="root" class="animation">
    <img id="logo" class="logo" src="/img/logo.png" alt="logo" />
    <img id="boy1" class="boy-1" src="/img/boy1.png" alt="boy" />
    <img id="girl1" class="girl-1" src="/img/girl1.png" alt="girl" />

    <img id="desc1" class="desc-1" src="/img/desc-1.png" alt="desc1" />
    <img id="desc2" class="desc-2" src="/img/desc-2.png" alt="desc2" />
    <img
      id="playBtn"
      class="play-btn"
      src="/img/play-btn.png"
      alt="play"
    />

    <img
      id="title2"
      class="title2"
      src="/img/title-2.png"
      alt="title2"
    />
    <img id="cert" class="cert" src="/img/cert.png" alt="cert" />
    <img
      id="licensing"
      class="licensing"
      src="/img/licensing.png"
      alt="licensing"
    />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const root = ref<HTMLElement | null>(null);

onMounted(() => {
  const container = root.value as HTMLElement;

  // Elements
  const logo = container.querySelector<HTMLElement>(".logo")!;
  const boy1 = container.querySelector<HTMLElement>(".boy-1")!;
  const girl = container.querySelector<HTMLElement>(".girl-1")!;
  const desc1 = container.querySelector<HTMLElement>(".desc-1")!;
  const desc2 = container.querySelector<HTMLElement>(".desc-2")!;
  const playBtn = container.querySelector<HTMLElement>(".play-btn")!;
  const title2 = container.querySelector<HTMLElement>(".title2")!;
  const cert = container.querySelector<HTMLElement>(".cert")!;
  const licensing = container.querySelector<HTMLElement>(".licensing")!;
  const widgets = container.querySelectorAll<HTMLElement>(".widgets");

  /* ---------------- Initial states ---------------- */
  gsap.set([boy1, girl, desc1, desc2, playBtn], { opacity: 0 });
  gsap.set(title2, { y: -200, opacity: 0 });
  gsap.set([cert, licensing], { x: "150%", opacity: 0 });
  gsap.set(logo, { x: 0, rotation: 0 });
  gsap.set(widgets, { opacity: 0, scale: 0 });

  /* ---------------- Animations ---------------- */
  const logoAnimation = () =>
    gsap
      .timeline()
      .to(logo, { y: -350, height: 100, duration: 1 })
      .to(logo, { rotation: 0, scale: 0.9 })
      .to(logo, { height: 100, duration: 1, ease: "power2.inOut" });

  const boyAnimation = () =>
    gsap
      .timeline()
      .to(boy1, { x: "-10%", opacity: 1, duration: 2, ease: "power3.out" });

  const girlAnimation = () =>
    gsap
      .timeline()
      .to(girl, { x: "10%", opacity: 1, duration: 2, ease: "power3.out" });

  const descAnimation = () =>
    gsap
      .timeline()
      .to(desc1, { y: -550, opacity: 1, duration: 2, ease: "power3.out" });

  const desc2Animation = () =>
    gsap
      .timeline()
      .to(desc2, { y: -450, opacity: 1, duration: 2, ease: "power3.out" });

  const playBtnAnimation = () =>
    gsap
      .timeline()
      .to(playBtn, { y: -100, opacity: 1, duration: 1, ease: "power3.out" });

  const widgetAnimation = () =>
    gsap.timeline().to(widgets, { opacity: 1, duration: 0 });

  const showCertLicensingTitle = () =>
    gsap
      .timeline()
      // hide others first
      .to([logo, girl, desc1, desc2, playBtn], {
        opacity: 0,
        y: 200,
        duration: 0.8,
        ease: "power2.in",
      })
      // bring in cert, licensing, title2 sabay
      .to([cert, licensing, title2], {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 2,
        ease: "power3.out",
      })
      // grow boy1
      .to(
        boy1,
        { height: "+=50", duration: 1, ease: "power2.out" },
        "-=0.5" // overlap with title2 animation
      );

  /* ---------------- Master Timeline ---------------- */
  const startTime = 2;
  const master = gsap.timeline();
  master
    .add(logoAnimation())
    .add(playBtnAnimation(), startTime)
    .add(descAnimation(), startTime)
    .add(desc2Animation(), startTime)
    .add(boyAnimation(), startTime)
    .add(girlAnimation(), startTime)
    .add(widgetAnimation(), startTime)
    .add(showCertLicensingTitle());

  ScrollTrigger.create({
    animation: master,
    trigger: container,
    scrub: 3,
    pin: true,
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
  background: url("/img/bg.jpg") no-repeat center center fixed;
  background-size: cover;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

:global(body::-webkit-scrollbar) {
  display: none;
}

.animation {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

/* === Base (mobile-first) === */
.logo {
  position: absolute;
  height: 80px;
}

.widgets {
  position: absolute;
  z-index: -1;
  scale: 0;
}

.boy-1 {
  position: absolute;
  bottom: 0;
  left: 5%;
  height: 350px;
}

.girl-1 {
  position: absolute;
  bottom: -1%;
  right: 5%;
  height: 350px;
}

.desc-1 {
  position: absolute;
  bottom: 8%;
  width: 100%;
}

.desc-2 {
  position: absolute;
  bottom: 15%;
  width: 100%;
}

.play-btn {
  position: absolute;
  bottom: 35%;
  width: 90%;
}

.title2 {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
}

.cert {
  position: absolute;
  top: 20%;

  width: 90%;
}

.licensing {
  position: absolute;
  top: 62%;
  left: 30%;
  width: 70%;
}

@media (min-width: 768px) and (max-width: 1438px) and (orientation: landscape) {
  .logo {
    height: 200px;
  }
  .boy-1 {
    height: 600px;
  }
  .girl-1 {
    height: 600px;
  }

  .title2 {
    position: absolute;
    top: 8%;
    width: 60%;
  }
  .desc-1 {
    position: absolute;
    bottom: 8%;
    width: 60%;
  }

  .desc-2 {
    position: absolute;
    bottom: 8%;
    width: 60%;
  }
  .play-btn {
    position: absolute;
    bottom: 15%;
    width: 40%;
  }
}

/* === Large desktop (≥1440px) === */
@media (min-width: 1439px) and (orientation: landscape) {
  .logo {
    height: 220px;
  }
  .boy-1,
  .girl-1 {
    height: 700px;
  }
  .desc-1 {
    position: absolute;
    bottom: 8%;
    width: 60%;
  }

  .desc-2 {
    position: absolute;
    bottom: 8%;
    width: 60%;
  }
  .play-btn {
    position: absolute;
    bottom: 15%;
    width: 40%;
  }

  .title2 {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
  }

  .cert {
    position: absolute;
    top: 20%;
    left: 43%;
    width: 35%;
  }

  .licensing {
    position: absolute;
    top: 70%;
    left: 33%;
    width: 55%;
  }
}
</style>
