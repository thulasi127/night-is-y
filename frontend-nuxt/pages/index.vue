<template>
  <div>
    <!-- Landing Video -->
    <transition name="fade">
      <video
        v-if="showVideo"
        autoplay
        muted
        playsinline
        class="fullscreen-video"
        @ended="goToHome"
      >
        <source src="/videos/landing.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const router = useRouter()

// state for showing the video
const showVideo = ref(true)

const goToHome = () => {
  showVideo.value = false
  router.push('/home') // navigate to /home after fade
}
</script>

<style>
.fullscreen-video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: 1;
}

/* fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
