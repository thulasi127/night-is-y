<template>
  <div class="container">
    <MusicLabel />

    <div class="grid">
      <div
        v-for="(v, i) in videos"
        :key="v.title + v.youtube_url + i"
        :class="['cell', colClass(i)]"
      >
        <MusicVideoCard
          :title="v.title"
          :subheading="v.subheading"
          :youtube_url="v.youtube_url"
          :variant="variantFor(i)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MusicLabel from '@/components/MusicLabel.vue'
import MusicVideoCard, { type Variant } from '@/components/MusicVideoCard.vue'
import raw from '~/data/music.json'

type MV = { title: string; subheading: string; youtube_url: string }

// normalize JSON shape
const videos: MV[] = (raw.music_videos as any[]).map(m => ({
  title: m.title,
  subheading: m.subheading ?? '',
  youtube_url: m.youtube_url
}))

/**
 * We repeat a 6-slot pattern so the page keeps the A24-style cascade
 * as you add more videos. Pattern (per 6):
 *  0: big (one), 1: medium (two), 2: small (three),
 *  3: small (four), 4: medium (five), 5: medium (two)
 *
 * Then it loops again for 6..11, 12..17, etc.
 */
const cycle: Variant[] = ['one', 'two', 'three', 'four', 'five', 'two']
const variantFor = (i: number): Variant => cycle[i % cycle.length]

/** Place items into 3 fixed columns */
const colClass = (i: number) => {
  const col = (i % 3) + 1 // 1..3
  return `col-${col}`
}
</script>

<style scoped>
.container {
  width: 1674px;
  margin: 0 auto;
  padding: 80px 0 160px; /* room below for scroll */
  background: #000;
}

/* 3 fixed columns 528px wide with 30px gutters (0 / 558 / 1116 layout) */
.grid {
  display: grid;
  margin-top: 32px;
  grid-template-columns: 528px 528px 528px; /* total 1584 + 2*30 gutter = 1644 inside the 1674 canvas */
  column-gap: 30px; /* horizontal gutter */
  row-gap: 60px;    /* vertical gap between rows */
  justify-content: center; /* centers the 3-column block within 1674 container */
}

/* Explicit column placement to keep consistent filling order */
.col-1 { grid-column: 1; }
.col-2 { grid-column: 2; }
.col-3 { grid-column: 3; }

@media (max-width: 1200px) {
  .container { width: 100%; padding: 100px 16px 80px; }
  .grid { grid-template-columns: 1fr; column-gap: 0; row-gap: 40px; }
}
</style>


