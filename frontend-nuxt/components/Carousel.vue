<template>
  <div class="carousel-root">
    <button class="carousel-arrow left" @click="prev" :disabled="!canGoPrev">‹</button>
    <div class="carousel-track" :style="trackStyle">
      <div
        v-for="(item, idx) in items"
        :key="item.id || idx"
        class="carousel-card"
        :class="{
          center: idx === centerIndex,
          hovered: hovered === idx
        }"
        @mouseenter="handleHover(idx)"
        @mouseleave="hovered = null"
        @click="emitPosterClick(item, $event)"
      >
        <img :src="item.poster" :alt="item.title" />
      </div>
    </div>
    <button class="carousel-arrow right" @click="next" :disabled="!canGoNext">›</button>
    <div class="carousel-lines">
      <span
        v-for="(_, idx) in items"
        :key="'line-' + idx"
        class="line"
        :class="{ active: idx === centerIndex }"
        @click="goTo(idx)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  items: { type: Array, required: true }
});
const emit = defineEmits(["onPosterClick"]);

const centerIndex = ref(0);
const hovered = ref(null);

function handleHover(idx) {
  hovered.value = idx;
  if (idx !== centerIndex.value) {
    centerIndex.value = idx; // Trigger smooth recenter on hover
  }
}

const canGoPrev = computed(() => centerIndex.value > 0);
const canGoNext = computed(() => centerIndex.value < props.items.length - 1);

function prev() {
  if (centerIndex.value > 0) {
    centerIndex.value--;
  }
}
function next() {
  if (centerIndex.value < props.items.length - 1) {
    centerIndex.value++;
  }
}
function goTo(idx) {
  centerIndex.value = idx;
}
function emitPosterClick(item, event) {
  emit("onPosterClick", item, event);
}

const trackStyle = computed(() => {
  const cardWidth = 360;
  const viewportCenter = window.innerWidth / 2;
  const activeCardCenter = centerIndex.value * cardWidth + cardWidth / 2;
  const translateX = viewportCenter - activeCardCenter;

  return {
    transform: `translateX(${translateX}px)`,
    transition: "transform 0.6s cubic-bezier(.77,0,.18,1)"
  };
});

</script>

<style scoped>
.carousel-root {
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0 40px;
  padding-top: 40px; /* adjust until perfect */
}

.carousel-track {
  display: flex;
  align-items: center;
  justify-content: left; /* This centers the cards horizontally */
  width: 100%;
  transition: transform 0.6s cubic-bezier(.77,0,.18,1);
  will-change: transform;
}

.carousel-card {
  width: 320px;
  height: 480px;
  margin: 0 20px;
  background: #111;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(.77,0,.18,1), box-shadow 0.3s;
  position: relative;
  z-index: 1;
}
.carousel-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
}

.carousel-card.center,
.carousel-card.hovered {
  transform: scale(1.1);
  box-shadow: 0 16px 48px rgba(0,0,0,0.35);
  z-index: 2;
}
.carousel-card:not(.center):not(.hovered) {
  transform: scale(0.9);
  opacity: 0.6;
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.08);
  border: none;
  color: #fff;
  font-size: 2.5rem;
  cursor: pointer;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}
.carousel-arrow.left { left: 24px; }
.carousel-arrow.right { right: 24px; }
.carousel-arrow:disabled { opacity: 0.3; cursor: default; }

.carousel-lines {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 48px; /* Pushes lines further down */
}
.line {
  width: 40px;
  height: 4px;
  background: #333;
  border-radius: 2px;
  transition: background 0.3s;
  cursor: pointer;
  opacity: 0.5;
}
.line.active {
  background: #fff;
  opacity: 1;
}
</style>
