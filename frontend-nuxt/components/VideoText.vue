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
    ></video>

    <!-- SVG text mask -->
    <svg class="mask-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 400" preserveAspectRatio="xMidYMid meet">
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
            font-size="200"
            text-transform="uppercase"
          >
            {{ text }}
          </text>
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="black" :mask="'url(#textMask)'" />
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
    default: 0.5 // slow motion (1 = normal speed)
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
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5600%;
  height: 5600%;
  object-fit: cover;
  transform: translate(-50%, -50%) scale(2.5);
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
</style>
