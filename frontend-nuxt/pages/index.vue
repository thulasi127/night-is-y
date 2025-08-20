<template>
  <video
    autoplay
    muted
    playsinline
    class="w-full h-screen object-cover"
    @ended="goToHome"
  >
    <source src="/videos/landing.mp4" type="video/mp4" />
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
