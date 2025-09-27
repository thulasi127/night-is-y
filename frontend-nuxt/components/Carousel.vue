<template>
  <div class="carousel-root">
    <!-- Left Arrow -->
    <button class="carousel-arrow left" @click="prev" :disabled="!canGoPrev">‹</button>

    <!-- Carousel Track -->
    <div class="carousel-track" :style="trackStyle">
      <div
        v-for="(item, idx) in items"
        :key="item.id || idx"
        class="carousel-card"
        :class="{ center: idx === centerIndex, hovered: hovered === idx }"
        @mouseenter="handleHover(idx)"
        @mouseleave="hovered = null"
        @click="emitPosterClick(item, $event)"
      >
        <img :src="item.poster" :alt="item.title" />
      </div>
    </div>

    <!-- Right Arrow -->
    <button class="carousel-arrow right" @click="next" :disabled="!canGoNext">›</button>

    <!-- Pagination Lines -->
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
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  items: { type: Array, required: true },
  autoSlide: { type: Boolean, default: false }, // Optional auto-slide toggle
  slideInterval: { type: Number, default: 10000 } // 10s per slide if enabled
});
const emit = defineEmits(["onPosterClick"]);

const centerIndex = ref(0);
const hovered = ref(null);
const lastHoveredIndex = ref(null);
let allowHover = true; // Controls whether hover recentering is allowed
let autoSlideTimer = null;

// Mouse movement resets hover allowance
function enableHoverOnMove() {
  allowHover = true;
}
window.addEventListener("mousemove", enableHoverOnMove);

// Hover handler: Only recenter when mouse moves + new poster
function handleHover(idx) {
  if (!allowHover || idx === lastHoveredIndex.value) return;

  hovered.value = idx;
  centerIndex.value = idx;
  lastHoveredIndex.value = idx;
  allowHover = false; // Prevent re-firing until mouse moves again
}

// Navigation
const canGoPrev = computed(() => centerIndex.value > 0);
const canGoNext = computed(() => centerIndex.value < props.items.length - 1);

function prev() {
  if (canGoPrev.value) centerIndex.value--;
  else centerIndex.value = props.items.length - 1; // Loop to last
}
function next() {
  if (canGoNext.value) centerIndex.value++;
  else centerIndex.value = 0; // Loop back to first
}
function goTo(idx) {
  centerIndex.value = idx;
}
function emitPosterClick(item, event) {
  emit("onPosterClick", item, event);
}

// Track style: Always center the active card
const trackStyle = computed(() => {
  const cardWidth = 360;
  const viewportCenter = window.innerWidth / 2;
  const activeCardCenter = centerIndex.value * cardWidth + cardWidth / 2;
  const translateX = viewportCenter - activeCardCenter;

  return {
    transform: `translateX(${translateX}px)`,
    transition: "transform 0.9s cubic-bezier(.77,0,.18,1)" // smooth & consistent
  };
});

// Optional auto-slide
function startAutoSlide() {
  if (!props.autoSlide) return;
  stopAutoSlide();
  autoSlideTimer = setInterval(() => {
    next();
  }, props.slideInterval);
}
function stopAutoSlide() {
  if (autoSlideTimer) clearInterval(autoSlideTimer);
}

onMounted(() => {
  centerIndex.value = 0;      // Always start at first poster
  hovered.value = null;
  allowHover = false;         // Disable hover initially

  // Enable hover only after a short delay (e.g., 800ms)
  setTimeout(() => {
    allowHover = true;
  }, 800);

  startAutoSlide();
});
onUnmounted(() => {
  stopAutoSlide();
  window.removeEventListener("mousemove", enableHoverOnMove);
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
  padding-top: 40px;
}

.carousel-track {
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
  transition: transform 0.9s cubic-bezier(.77,0,.18,1);
  will-change: transform;
}

.carousel-card,
.poster-image-wrapper {
  width: 360px;
  height: 540px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
}

/* Centered or hovered card enlarges */
.carousel-card.center,
.carousel-card.hovered {
  transform: scale(1.1);
  box-shadow: 0 16px 48px rgba(0,0,0,0.35);
  z-index: 2;
}
/* Others shrink & fade slightly */
.carousel-card:not(.center):not(.hovered) {
  transform: scale(0.9);
  opacity: 0.6;
}

/* Arrows */
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

/* Pagination lines */
.carousel-lines {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 72px;
}
.line {
  width: 24px;   /* shorter length */
  height: 2px;   /* thinner height */
  background: #333;
  border-radius: 1px;
  transition: background 0.3s;
  cursor: pointer;
  opacity: 0.5;
}

.line.active {
  background: #fff;
  opacity: 1;
}

.poster-overlay.immediate.center-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
  z-index: 2;
  pointer-events: none;
  opacity: 1;
  transition: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.poster-title-neue {
  width: 100%;
  text-align: center;
  color: white;
  font-size: 28px;
  font-family: "proxima-nova", sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  line-height: 30px;
  word-wrap: break-word;
  margin-bottom: 8px;
}

.poster-hovered {
  filter: brightness(0.5);
}
.poster-image-wrapper {
  position: relative;
  width: 455px;
  height: 670px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  /* No margin-left or margin-right unless needed for edge cases */
}

</style>
