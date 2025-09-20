<template>
  <div class="music-container">
    <div class="music-label">
      <h1 class="music-heading">Music Videos</h1>
    </div>
    <div class="section mid top">
      <MusicVideoCard v-bind="video" variant="two"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import MusicVideoCard from '@/components/MusicVideoCard.vue'
defineProps<{ video: { title:string; subheading:string; youtube_url:string } }>()
</script>

<style scoped>
.music-container {
  margin-top: 80px; /* Adjust to match your navbar height */
}

.music-label {
  margin-bottom: 32px;
}

.music-heading {
  font-family: Impact, "Arial Black", Arial, sans-serif;
  font-size: 2.5rem;
  font-weight: 900;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #fff;
}

.section {
  position: absolute;
  padding: 0 0 80px;
  width: 528px; /* leaves 30px gutter with left: 0 / 558 / 1116 */
}
.left { left: 0; }
.mid  { left: 558px; }
.right{ left: 1116px; }
.top  { top: 100px; }
.lower{ top: 673px; }

@media (max-width: 1200px) {
  .section {
    position: static;
    width: 100%;
    padding: 0 0 40px;
  }
}
</style>
