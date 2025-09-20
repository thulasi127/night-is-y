<template>
  <div class="music-videos-page">
    <NavBar />
    <MusicContainer />
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
  --nav-h: 72px;          /* <— tweak if your navbar is taller/shorter */
  background: #000;
  min-height: 100vh;
  padding-top: var(--nav-h);  /* moves everything below the fixed NavBar */
}

.music-container {
  margin-top: 80px; /* Adjust this value to match your navbar height */
}
.music-video-card {
  /* Add your styles here */
}
.subheading {
  /* Add your styles here */
}
.music-title {
  /* Add your styles here */
}
</style>
