<!-- /pages/index.vue -->
<script setup lang="ts">
import siteData from '~/data/site.json'

const landingVideo = siteData.landing_video

definePageMeta({
  pageTransition: { name: 'fade', mode: 'out-in' }
})

const goHome = () => navigateTo('/home')

useHead({
  title: 'Night is Y',
  meta: [{ name: 'description', content: 'Welcome to Night is Y.' }]
})
</script>

<template>
  <div class="wrap">
    <video
      class="bgVideo"
      :src="landingVideo.src"
      autoplay
      muted
      playsinline
      preload="auto"
      @ended="goHome"
    />

    <p v-if="landingVideo.alt" class="sr-only">{{ landingVideo.alt }}</p>
  </div>
</template>

<style scoped>
.wrap {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background: black;
}
.bgVideo {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}

/* ---------- Large Laptops (≤1440px) ---------- */
@media (max-width: 1440px) {
  .bgVideo {
    width: 100vw;
    height: 100vh;
    object-position: center center;
  }
}

/* ---------- Tablets & Small Laptops (≤1024px) ---------- */
@media (max-width: 1024px) {
  .bgVideo {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    object-position: center center;
  }
}

/* ---------- Tablets Portrait & Large Phones (≤768px) ---------- */
@media (max-width: 768px) {
  .bgVideo {
    width: auto;
    height: 100vh;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain; /* full video visible */
    object-position: center center;
    background: black;
  }
}

/* ---------- Small Phones (≤430px) ---------- */
@media (max-width: 430px) {
  .bgVideo {
    width: auto;
    height: 100vh;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    object-position: center center;
    background: black;
  }
}
</style>