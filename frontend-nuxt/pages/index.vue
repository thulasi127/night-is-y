<!-- /pages/index.vue -->
<script setup lang="ts">
definePageMeta({
  pageTransition: { name: 'fade', mode: 'out-in' }
})

const goHome = () => {
  navigateTo('/home')
}
</script>

<template>
  <div class="wrap">
    <video
      class="bgVideo"
      src="/videos/landing.mp4"
      autoplay
      muted
      playsinline
      preload="auto"
      @ended="goHome"
    />
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
</style>
