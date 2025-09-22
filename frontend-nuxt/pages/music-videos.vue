<template>
  <div class="music-videos-page">
    <NavBar />
    <!-- Fixed page label under the navbar -->
    <div class="fixed-label">
      <MusicLabel />
    </div>

    <!-- Only this area scrolls -->
    <div class="scroll-area">
      <MusicContainer />
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import MusicContainer from '@/components/music/MusicContainer.vue'

useHead({
  title: 'Music Videos | NIGHT is Y',
  meta: [{ name: 'description', content: 'Music videos by NIGHT is Y.' }]
})
</script>

<style scoped>
.music-videos-page {
  /* adjust to your real navbar height (e.g., 80/88px) */
  --nav-h: 88px;

  position: relative;
  background: #000;

  /* let this wrapper create vertical scroll */
  min-height: 100vh;
  overflow-y: auto;

  /* push content below the fixed NavBar */
  padding-top: var(--nav-h);
}

.music-container {
  margin-top: 70px;
  background: transparent; /* Ensures the music videos container has a transparent background */
}


.fixed-label {
  font-family: "anton", sans-serif;
  font-weight: 300;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 80px 0 160px;
  font-size: 30px;
  position: fixed;
  top: var(--nav-h);
  left: 120px; 
  right: 0;
  height: var(--label-h);
  z-index: 1; /* Lower z-index so scroll-area content appears above */
  background: transparent;
}

/* The ONLY scrollable region */
.scroll-area{
  position: relative;
  height: calc(100vh - var(--nav-h) - var(--label-h));
  margin-top: calc(var(--nav-h) + var(--label-h));
  overflow-y: auto;
  overscroll-behavior: contain;
  z-index: 2; /* Higher z-index so it scrolls over the label */
}

</style>
