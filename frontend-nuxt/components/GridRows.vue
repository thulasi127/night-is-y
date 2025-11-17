<template>
  <div class="grid-rows">
    <div
      class="grid-item clickable"
      v-for="item in items"
      :key="item.id"
      @click="$emit('onItemClick', item)"
    >
      <img
  class="grid-thumb"
  :src="urlFor(item.poster).auto('format').url()"
  :style="{ objectPosition: item.poster.hotspot ? 
    `${item.poster.hotspot.x * 100}% ${item.poster.hotspot.y * 100}%` : 'center' }"
/>
      <div class="img-overlay"></div>
      <div class="row-label">{{ item.title }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
});

defineEmits(['onItemClick']);
</script>

<style scoped>
/* Container */
.grid-rows {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  flex: 1;
}

/* Item */
.grid-item {
  position: relative;
  flex: 1 1 0;
  min-height: 180px;
  max-height: 400px;
  display: flex;
  align-items: center;      /* center vertically */
  justify-content: center;  /* center horizontally */
  overflow: hidden;
  transition: transform 0.4s ease;
  transform-origin: center;
  z-index: 0;
}

.grid-item:hover {
  transform: scale(1.05);
  z-index: 5;
}

/* Thumbnail */
.grid-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;        /* ensures perfect cropping */
  object-position: center;  /* ensures perfect centering */
  filter: brightness(0.9);
  transition: transform 0.4s ease, filter 0.3s, box-shadow 0.3s;
  z-index: 1;
}

.grid-item:hover .grid-thumb {
  filter: brightness(1.05);
  transform: scale(1.1);
}

/* Overlay */
.img-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.15);
  z-index: 2;
  pointer-events: none;
  transition: background 0.3s ease;
}

.grid-item:hover .img-overlay {
  background: rgba(0,0,0,0);
}

/* Label */
.row-label {
  z-index: 3;
  position: absolute;
  right: calc(100px + 5vw);
  bottom: 32px;
  color: #fff;
  font-family: "proxima-nova", sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-shadow: 0 2px 8px rgba(0,0,0,0.7);
  padding: 8px 20px;
  pointer-events: none;
  max-width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
}

/* ---------------- Media Queries (EXACT from Projects.vue) ---------------- */

/* ≤900px */
@media (max-width: 900px) {
  .grid-item {
    min-height: 120px;
    max-height: 220px;
  }
  .row-label {
    font-size: 1rem;
    right: 16px;
    bottom: 12px;
    padding: 4px 10px;
    max-width: 80%;
  }
}

/* ≤1440px */
@media (max-width: 1440px) {
  .row-label {
    font-size: 1.1rem;
    bottom: 24px;
    right: calc(60px + 4vw);
  }
  .grid-item {
    min-height: 160px;
    max-height: 320px;
  }
}

/* ≤1024px */
@media (max-width: 1024px) {
  .row-label {
    font-size: 1rem;
    bottom: 20px;
    right: calc(40px + 3vw);
  }
  .grid-item {
    min-height: 140px;
    max-height: 260px;
  }
}

/* ≤768px */
@media (max-width: 768px) {
  .row-label {
    font-size: 0.9rem;
    right: 20px;
    bottom: 16px;
  }
  .grid-item {
    min-height: 120px;
    max-height: 220px;
  }
}

/* ≤430px */
@media (max-width: 430px) {
  .row-label {
    font-size: 0.8rem;
    right: 16px;
    bottom: 12px;
  }
  .grid-item {
    min-height: 100px;
    max-height: 180px;
  }
}
</style>
