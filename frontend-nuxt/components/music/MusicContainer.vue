<template>
  <div class="container">
    <!-- label moved out; keep just the list -->
    <div class="grid" ref="gridEl">
      <div v-for="(v, i) in videos" :key="v.title + v.youtube_url + i" class="cell" ref="cells">
        <MusicVideoCard
          :title="v.title"
          :subheading="v.subheading"
          :youtube_url="v.youtube_url"
          :variant="variantFor(i)"
        />
        <img :src="getCoverImage(v)" :alt="v.title" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import MusicLabel from '@/components/MusicLabel.vue'
import MusicVideoCard, { type Variant } from '@/components/MusicVideoCard.vue'
import raw from '~/data/music.json'

type MV = { title: string; subheading: string; youtube_url: string }
const videos: MV[] = (raw.music_videos as any[]).map(m => ({
  title: m.title,
  subheading: m.subheading ?? '',
  youtube_url: m.youtube_url
}))

const cycle: Variant[] = ['one', 'two', 'three', 'four', 'five', 'two']
const variantFor = (i: number): Variant => cycle[i % cycle.length]

const gridEl = ref<HTMLDivElement | null>(null)
const cells  = ref<HTMLDivElement[]>([])

const GRID_ROW_HEIGHT = 8
const GRID_GAP = 60

function setSpanForCell(cell: HTMLDivElement) {
  const content = cell.firstElementChild as HTMLElement
  if (!content) return
  const height = content.offsetHeight
  const total  = height + GRID_GAP
  const span   = Math.ceil(total / (GRID_ROW_HEIGHT + GRID_GAP))
  cell.style.gridRowEnd = `span ${span}`
}

function relayout() { nextTick(() => cells.value.forEach(setSpanForCell)) }

onMounted(() => {
  relayout()
  const onResize = () => relayout()
  window.addEventListener('resize', onResize, { passive: true })
  ;(gridEl.value as any).__onResize = onResize

  const ro = new ResizeObserver(() => relayout())
  cells.value.forEach(c => ro.observe(c))
  ;(gridEl.value as any).__ro = ro
})

onBeforeUnmount(() => {
  const onResize = (gridEl.value as any)?.__onResize
  if (onResize) window.removeEventListener('resize', onResize)
  const ro: ResizeObserver | undefined = (gridEl.value as any)?.__ro
  ro?.disconnect()
})

function getCoverImage(video) {
  if (video.cover_image) return video.cover_image;
  if (video.youtube_url) {
    const match = video.youtube_url.match(/embed\/([^?]+)/);
    if (match && match[1]) {
      return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
    }
  }
  return null;
}
</script>

<style scoped>
.container{
  width:1674px;
  margin:0 auto;
  padding:200px 0 160px;  /* no big top padding now; label is fixed */
  background: transparent;
}

/* Masonry grid: 3x 528px columns, 30px gutters, 60px vertical gap */
.grid {
  display: grid;
  justify-content: center;
  grid-template-columns: 528px 528px 528px;
  column-gap: 30px;
  grid-auto-rows: 8px;
  row-gap: 60px;
  grid-auto-flow: row dense;
}

.cell {
  width: 528px;
}

.link-figure { display: flex; flex-direction: column; gap: 16px; width: 100%; }
.figcaption {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  text-align: center;
  margin: 0;
}
.figcaption > * { margin: 0; }

@media (max-width: 1200px) {
  .container { width: 100%; padding: 24px 16px 80px; }
  .grid { grid-template-columns: 1fr; column-gap: 0; row-gap: 40px; grid-auto-rows: 8px; }
  .cell { width: 100%; }
}
</style>


