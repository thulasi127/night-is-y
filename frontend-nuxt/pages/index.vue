<template>
  <video autoplay loop muted playsinline class="w-full h-screen object-cover">
    <source src="/videos/landing.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToHome() {
  router.push('/home')
}
</script>

<style>
.video-bg {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}
</style>
