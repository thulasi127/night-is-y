<template>
  <div class="video-mask-container">
    <!-- The video layer -->
   <video
  ref="videoEl"
  class="mask-video"
  :src="videoSrc"
  autoplay
  muted
  loop
  playsinline
  preload="auto"
  crossorigin="anonymous"
  aria-hidden="true"
>
  <source :src="videoSrc" type="video/mp4" />
  <source :src="videoSrc.replace('.mp4', '.webm')" type="video/webm" />
  <source :src="videoSrc.replace('.mp4', '.ogg')" type="video/ogg" />
  <p>Your browser does not support HTML5 video.</p>
</video>


    <!-- SVG text mask -->
    <svg class="mask-svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">

      <defs>
        <mask id="textMask" x="0" y="0" width="100%" height="100%">
          <rect width="100%" height="100%" fill="white" />
          <text
  x="50%"
  y="50%"
  text-anchor="middle"
  dominant-baseline="middle"
  fill="black"
  font-family="anton, sans-serif"
  font-weight="700"
  :font-size="fontSize"
  text-transform="uppercase"
>
  {{ text }}
</text>

        </mask>
      </defs>
      <rect width="100%" height="100%" fill="black" mask="url(#textMask)" />

    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps({
  text: String,
  videoSrc: String,
  speed: {
    type: Number,
    default: 0.5
  },
  fontSize: {
    type: [Number, String],
    default: 200
  }
})



const videoEl = ref<HTMLVideoElement | null>(null)

onMounted(() => {
  if (videoEl.value) {
    videoEl.value.playbackRate = props.speed
  }
})
</script>

<style scoped>
.video-mask-container {
  position: relative;
  display: block;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  overflow: hidden;
  background: black;
}

/* video behind the SVG mask */
.mask-video {
  width: 1800%;
  height: 1800%;
  object-fit: cover;
  transform: translate(-50%, -50%) scale(2);
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 0;
  filter: brightness(1.2) saturate(1.3);
}

/* SVG mask overlay */
.mask-svg {
  position: relative;
  width: 100%;
  height: auto;
  z-index: 1;
  display: block;
}

/* Adding */

/* ---------- Large Laptops (≤1440px) ---------- */
@media (max-width: 1440px) {
  .mask-video {
    width: 1500%;
    height: 1500%;
    transform: translate(-50%, -50%) scale(1.8);
  }
}

/* ---------- Tablets (≤1024px) ---------- */
@media (max-width: 1024px) {
  .mask-video {
    width: 1200%;
    height: 1200%;
    transform: translate(-50%, -50%) scale(1.6);
  }
  .mask-svg text {
    font-size: clamp(1.6rem, 2.4vw, 2rem);
  }
}

/* ---------- Small Tablets (≤768px) ---------- */
@media (max-width: 768px) {
  .mask-video {
    width: 1000%;
    height: 1000%;
    transform: translate(-50%, -50%) scale(1.4);
  }
  .mask-svg text {
    font-size: clamp(1.3rem, 2vw, 1.8rem);
  }
}

/* ---------- Small Phones (≤480px) ---------- */
@media (max-width: 480px) {
  .mask-video {
    width: 800%;
    height: 800%;
    transform: translate(-50%, -50%) scale(1.2);
  }
  .mask-svg text {
    font-size: clamp(1rem, 1.8vw, 1.2rem);
  }
}

</style>
