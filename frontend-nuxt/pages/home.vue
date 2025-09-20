<!-- /pages/home.vue -->
<script setup lang="ts">
import NavBar from '~/components/NavBar.vue'

useHead({
  title: 'Home | NIGHT is Y',
  meta: [{ name: 'description', content: 'Welcome to NIGHT is Y.' }]
})
</script>

<template>
  <div class="wrap">
    <!-- Full-viewport background video -->
    <video
      class="bgVideo"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
      @error="console.warn('Could not load /videos/default.mp4')"
    >
      <source src="/videos/default.mp4" type="video/mp4" />
    </video>

    <!-- Transparent navbar on top -->
    <NavBar />
  </div>
</template>

<style scoped>
.wrap {
  position: relative;
  min-height: 100vh;
  width: 100%;
  /* transparent so the video shows through */
  background: transparent;
  overflow: hidden;
}

/* The video is fixed to the viewport and behind the navbar */
.bgVideo {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  /* sits below the navbar (navbar z-index is 1000 in your component) */
  z-index: 0;
  /* shows black only while the video buffers */
  background: #000;
  /* let clicks pass to the navbar */
  pointer-events: none;
}
</style>
