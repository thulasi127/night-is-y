<template>
  <div class="projects-page-film centered-layout">
    <NavBar />
    <div class="film-series-header-row">
      <div class="projects-cta" @click="goToProjects">
        <ChevronLeftIcon class="chevron-left-small" />
        <span class="projects-text">PROJECTS</span>
      </div>
      <div class="film-series-title">FILM &amp; SERIES</div>
    </div>
    <div
      class="posters-row"
      @mousedown="startDrag"
      @mousemove="onDrag"
      @mouseup="endDrag"
      @mouseleave="endDrag"
      @touchstart="startDrag"
      @touchmove="onDrag"
      @touchend="endDrag"
    >
      <div
        v-for="(film, idx) in visibleFilms"
        :key="film.id"
        class="poster-image-wrapper"
        @mouseenter="hovered = idx"
        @mouseleave="hovered = null"
      >
        <div class="image">
          <img
            class="img"
            :class="{ 'poster-hovered': hovered === idx }"
            :src="film.poster"
            :alt="film.title"
          />
          <div v-if="hovered === idx" class="poster-overlay immediate center-overlay">
            <div class="poster-title-neue">{{ film.title }}</div>
            <div class="poster-type-neue">{{ film.type }}</div>
          </div>
        </div>
      </div>
    </div>
    <button
      class="arrow arrow-left"
      :disabled="!canGoPrevious"
      :style="{ opacity: canGoPrevious ? 1 : 0.3 }"
      @click="previousSlide"
      aria-label="Previous"
    >
      <ChevronLeftIcon class="arrow-icon" />
    </button>
    <button
      class="arrow arrow-right"
      :disabled="!canGoNext"
      :style="{ opacity: canGoNext ? 1 : 0.3 }"
      @click="nextSlide"
      aria-label="Next"
    >
      <ChevronRightIcon class="arrow-icon" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";
import NavBar from "../components/NavBar.vue";
import filmsData from "../data/films.json";
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "ProjectsPageFilm",
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
    NavBar
  },
  setup() {
    const films = ref([]);
    const currentIndex = ref(0);
    const itemsPerPage = 3;
    const hovered = ref<number | null>(null);
    const router = useRouter();

    // Drag/swipe state
    const dragStartX = ref<number | null>(null);
    const dragDelta = ref(0);

    onMounted(() => {
      films.value = filmsData;
    });

    const visibleFilms = computed(() =>
      films.value.slice(currentIndex.value, currentIndex.value + itemsPerPage)
    );

    const canGoPrevious = computed(() => currentIndex.value > 0);
    const canGoNext = computed(
      () => currentIndex.value + itemsPerPage < films.value.length
    );

    const previousSlide = () => {
      if (canGoPrevious.value) currentIndex.value--;
    };
    const nextSlide = () => {
      if (canGoNext.value) currentIndex.value++;
    };

    // Drag/swipe handlers
    const startDrag = (e: MouseEvent | TouchEvent) => {
      dragStartX.value = 'touches' in e ? e.touches[0].clientX : e.clientX;
      dragDelta.value = 0;
    };
    const onDrag = (e: MouseEvent | TouchEvent) => {
      if (dragStartX.value === null) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      dragDelta.value = clientX - dragStartX.value;
    };
    const endDrag = (e: MouseEvent | TouchEvent) => {
      if (dragStartX.value === null) return;
      const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX;
      const delta = clientX - dragStartX.value;
      if (delta > 80 && canGoPrevious.value) previousSlide();
      else if (delta < -80 && canGoNext.value) nextSlide();
      dragStartX.value = null;
      dragDelta.value = 0;
    };

    const goToProjects = () => {
      router.push('/projects');
    };

    return {
      films,
      visibleFilms,
      currentIndex,
      previousSlide,
      nextSlide,
      canGoPrevious,
      canGoNext,
      hovered,
      startDrag,
      onDrag,
      endDrag,
      goToProjects
    };
  }
});
</script>

<style>
.centered-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(0deg, #000 0%, #000 100%);
  position: relative;
  overflow: hidden;
}

.film-series-header-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 32px;
  margin-bottom: 40px;
  position: relative;
}

.projects-cta {
  position: absolute;
  left: 192px; /* Shift right by 4 tabs (approx 4 x 48px) */
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.film-series-title {
  margin: 0 auto;
  color: #fff;
  font-family: "Right Grotesk", Helvetica, Arial, sans-serif;
  font-size: 48px;
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: 0;
  text-transform: uppercase;
  text-align: center;
  z-index: 2;
  white-space: nowrap;
  flex: 1;
}

.chevron-left-small {
  width: 22px;
  height: 22px;
  color: #fff;
}

.projects-text {
  color: #fff;
  font-family: "Neue Montreal", Helvetica, Arial, sans-serif;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 15px;
}

.posters-row {
  width: 100%;
  max-width: 1728px;
  height: 670px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 48px;
  user-select: none;
  touch-action: pan-y;
  transition: transform 0.5s cubic-bezier(.77,0,.18,1);
}

.poster-image-wrapper {
  position: relative;
  width: 455px;
  height: 670px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image {
  height: 662px;
  width: 447px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img {
  aspect-ratio: 0.68;
  height: 670px;
  width: 455px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  transition: filter 0.15s;
}

.poster-hovered {
  filter: brightness(0.5);
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
  font-family: "Neue Montreal", Helvetica, Arial, sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  line-height: 30px;
  word-wrap: break-word;
  margin-bottom: 8px;
}

.poster-type-neue {
  width: 100%;
  text-align: center;
  color: white;
  font-size: 22px;
  font-family: "Neue Montreal", Helvetica, Arial, sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  line-height: 26px;
  word-wrap: break-word;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 68px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  background: none;
  border: none;
  transition: opacity 0.2s;
}
.arrow-left {
  left: 67px;
}
.arrow-right {
  right: 67px;
}

.arrow-icon {
  width: 40px;
  height: 40px;
  color: #fff;
}

button.arrow:disabled {
  cursor: not-allowed;
}
</style>
