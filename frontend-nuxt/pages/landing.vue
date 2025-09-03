<!-- /pages/landing.vue -->
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
    <button class="skip" @click="goHome">Skip</button>
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
.skip {
  position: fixed;
  right: 16px;
  bottom: 16px;
  padding: 8px 12px;
  background: rgba(255,255,255,.2);
  border: 1px solid rgba(255,255,255,.35);
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
}
</style>
