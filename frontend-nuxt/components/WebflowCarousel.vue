<template>
  <div class="element-default">
    <!-- Carousel Track -->
    <div class="carousel-track" :style="trackStyle">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="carousel-card"
        :class="{ active: index === currentIndex }"
        @click="handlePosterClick(item)"
      >
        <img :src="item.poster" :alt="item.title" />
      </div>
    </div>

    <!-- Navigation Arrows -->
    <button class="arrow left" @click="prevSlide" :disabled="currentIndex === 0">
      ‹
    </button>
    <button
      class="arrow right"
      @click="nextSlide"
      :disabled="currentIndex >= items.length - itemsPerView"
    >
      ›
    </button>

    <!-- Dot Navigation -->
    <div class="dots">
      <span
        v-for="(dot, i) in totalDots"
        :key="i"
        :class="{ active: i === currentIndex }"
        @click="goToSlide(i)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  items: { type: Array, required: true },
  onPosterClick: { type: Function, required: true },
});

const currentIndex = ref(0);
const itemsPerView = 2; // first load shows 2 items

const totalDots = computed(() => {
  if (!props.items || props.items.length === 0) return 0;
  return Math.max(1, Math.ceil(props.items.length - itemsPerView + 1));
});

const trackStyle = computed(() => {
  const translateX = -(currentIndex.value * 340); // card width + margin
  return {
    transform: `translateX(${translateX}px)`,
    transition: "transform 0.6s ease",
  };
});

function nextSlide() {
  if (currentIndex.value < props.items.length - itemsPerView) {
    currentIndex.value++;
  }
}

function prevSlide() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
}

function goToSlide(index) {
  currentIndex.value = index;
}

function handlePosterClick(item) {
  props.onPosterClick(item);
}
</script>

<style scoped>
.element-default {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: black;
  padding: 80px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.carousel-track {
  display: flex;
  gap: 24px;
  will-change: transform;
}

.carousel-card {
  width: 320px;
  height: 480px;
  border-radius: 16px;
  overflow: hidden;
  flex-shrink: 0;
  transition: transform 0.4s ease;
  cursor: pointer;
}

.carousel-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-card.active {
  transform: scale(1.05);
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
}

.arrow.left {
  left: 20px;
}

.arrow.right {
  right: 20px;
}

.arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.dots {
  display: flex;
  gap: 6px;
  margin-top: 20px;
}

.dots span {
  width: 8px;
  height: 8px;
  background: #666;
  border-radius: 50%;
  display: block;
  cursor: pointer;
}

.dots span.active {
  background: white;
}
</style>

<WebflowCarousel 
  v-if="films.length > 0" 
  :items="films" 
  :onPosterClick="openModal" 
/>
