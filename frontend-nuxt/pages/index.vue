<template>
  <video autoplay muted loop playsinline class="fullscreen-video">
    <source src="/videos/landing.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</template>

<script setup>
const router = useRouter()

const goToHome = () => {
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
