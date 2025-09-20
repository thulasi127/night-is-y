<template>
  <div :class="['music-card', variant]">
    <div class="link-figure">
      <div class="background">
        <div
          class="video-wrapper"
          @click="expandVideo"
          :class="{ fullscreen: isFullscreen }"
        >
          <iframe
            class="video"
            :src="youtube_url"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
        </div>
      </div>

      <div class="figcaption">
        <div class="subheading">{{ subheading }}</div>
        <div class="title" @click="expandVideo">{{ title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
export type Variant = 'one' | 'two' | 'three' | 'four' | 'five'
defineProps<{
  title: string
  subheading: string
  youtube_url: string
  variant: Variant
}>()

const isFullscreen = ref(false)
function expandVideo() {
  isFullscreen.value = !isFullscreen.value
}
</script>

<style scoped>
.music-card { display: flex; flex-direction: column; padding: 0 15px; width: 100%; }
.link-figure { display: flex; flex-direction: column; gap: 16px; width: 100%; }
.background { background: #111; border-radius: 12px; overflow: hidden; }
.video { width: 100%; display: block; }

/* Match your Upcoming card heights */
.one   .video { height: 620.38px; }  /* big */
.two   .video { height: 406.55px; }  /* medium */
.three .video { height: 345.83px; }  /* small */
.four  .video { height: 345.83px; }  /* small */
.five  .video { height: 406.55px; }  /* medium */

/* Centered captions */
.figcaption { display: flex; flex-direction: column; gap: 6px; align-items: center; text-align: center; }
.title {
  color: #fff;
  font-family: "Helvetica Neue-Medium", Helvetica, Arial, sans-serif;
  font-size: 37px;
  line-height: 38px;
  letter-spacing: -1.14px;
  transition: color 0.2s;
  cursor: pointer;
}
.title:hover {
  color: #593792;
  brightness: 1.2;
}
.subheading { color:#777; font-family:"Helvetica Neue-Regular", Helvetica, Arial, sans-serif; font-size:14px; }

.video-wrapper {
  cursor: pointer;
  transition: all 0.3s;
  z-index: 100;
}
.video-wrapper.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width:1200px){
  .video { height:auto; aspect-ratio:16/9; }
  .title { font-size:28px; line-height:1.2; }
}
</style>
