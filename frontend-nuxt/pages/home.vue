<script setup lang="ts">
import { client } from '~/utils/sanityClient'
import { ref, onMounted } from 'vue'

const videoUrl = ref<string | null>(null)

onMounted(async () => {
  const query = `*[_type == "homepage"][0]{ "videoUrl": video.asset->url }`
  const data = await client.fetch(query)
  videoUrl.value = data?.videoUrl
})
</script>

<template>
  <div class="homepage">
    <video v-if="videoUrl" autoplay loop muted playsinline class="w-full h-screen object-cover">
      <source :src="videoUrl" type="video/mp4" />
    </video>
    <nav>
      <!-- fixed nav bar here -->
    </nav>
  </div>
</template>
