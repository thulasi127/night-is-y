<template><div class="section mid lowerish"><MusicVideoCard v-bind="video" variant="five"/></div></template>
<script setup lang="ts">
import MusicVideoCard from '@/components/MusicVideoCard.vue'
defineProps<{ video: { title:string; subheading:string; youtube_url:string } }>()
</script>
<style scoped>
.section { position:absolute; padding:0 0 80px; width:calc(100% - 1116px); }
.mid  { left: 558px; } .lowerish { top:673px; }
@media (max-width: 1200px) {
  .section { position: static; width: 100%; padding: 0 0 40px; }
}
</style>
