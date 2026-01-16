<!-- /pages/home.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useAsyncData, useHead } from '#app'

import NavBar from '~/components/NavBar.vue'
import { sanityClient } from '~/utils/sanityClient'
import { HOMEPAGE_QUERY } from '~/lib/queries/homepage'

await useAsyncData('homepage', () => sanityClient().fetch(HOMEPAGE_QUERY), {
  server: true,
  lazy: false
})

if (process.client) {
  console.log('pending:', pending.value)
  console.log('homepage:', homepage.value)
  console.log('homepage src:', homepage.value?.src)
}

// const isVideoReady = ref(false)

useHead({
  title: 'Home | Night is Y',
  meta: [{ name: 'description', content: 'Welcome to Night is Y.' }]
})
</script>

<template>
  <div class="wrap">
    <!-- <p style="position:fixed;top:0;left:0;z-index:9999;background:#fff;color:#000;padding:6px;">
  {{ homepage?.src || 'NO SRC' }}
</p> -->
  <ClientOnly>
  <video
    v-if="homepage?.src"
    class="bgVideo"
    autoplay
    muted
    loop
    playsinline
    preload="auto"
  >
    <source :src="homepage.src" type="video/mp4" />
  </video>
</ClientOnly>

<!-- optional accessibility text -->
<p v-if="homepage?.alt" class="sr-only">{{ homepage.alt }}</p>

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

/* ---------- Large Laptops (≤1440px) ---------- */
@media (max-width: 1440px) {
  .bgVideo {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
}

/* ---------- Tablets & Small Laptops (≤1024px) ---------- */
@media (max-width: 1024px) {
  .bgVideo {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
}

/* ---------- Tablets Portrait & Large Phones (≤768px) ---------- */
@media (max-width: 768px) {
  .bgVideo {
    width: 100vw;
    height: 100vh;
    object-fit: cover; /* force full page even if it crops a bit */
  }
}

/* ---------- Small Phones (≤430px) ---------- */
@media (max-width: 430px) {
  .bgVideo {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
}

</style>