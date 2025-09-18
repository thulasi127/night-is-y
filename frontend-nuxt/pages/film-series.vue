<template>
  <div class="projects-page-film-centered">
    <NavBar />
    <div class="projects-cta" @click="goToProjects" style="cursor:pointer">
      <ChevronLeftIcon class="chevron-icon" />
      <span class="projects-text">PROJECTS</span>
    </div>
    <!-- Film & Series title, styled and positioned to the left -->
    <h1 class="film-series-heading">FILM &amp; SERIES</h1>
    <div
      class="carousel-wrapper"
      @mousedown="startDrag"
      @mousemove="onDrag"
      @mouseup="endDrag"
      @mouseleave="endDrag"
      @touchstart="startDrag"
      @touchmove="onDrag"
      @touchend="endDrag"
    >
      <button
        class="carousel-arrow carousel-arrow-left"
        :disabled="!canGoPrevious"
        @click="previousSlide"
        aria-label="Previous"
      >
        <ChevronLeftIcon class="arrow-icon" />
      </button>
      <div class="carousel-track" :style="trackStyle">
        <div
          v-for="(film, index) in films"
          :key="film.id"
          class="carousel-item"
        >
          <img
            :src="film.poster"
            :alt="film.title"
            class="film-poster-img"
            loading="lazy"
          />
          <div class="carousel-film-title">{{ film.title }}</div>
        </div>
      </div>
      <button
        class="carousel-arrow carousel-arrow-right"
        :disabled="!canGoNext"
        @click="nextSlide"
        aria-label="Next"
      >
        <ChevronRightIcon class="arrow-icon" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRouter } from 'vue-router';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";
import NavBar from "../components/NavBar.vue";
import filmsData from "../data/films.json";

interface Film {
  id: number;
  title: string;
  poster: string;
  type: string;
}

export default defineComponent({
  name: "ProjectsPageFilm",
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
    NavBar
  },
  setup() {
    const router = useRouter();
    const films = ref<Film[]>([]);
    const currentIndex = ref(0);
    const itemsPerPage = 3;

    // Drag state
    const dragStartX = ref<number | null>(null);
    const dragDelta = ref(0);

    const currentFilms = computed(() => {
      if (films.value.length === 0) return [];
      const start = currentIndex.value;
      return films.value.slice(start, start + itemsPerPage);
    });

    const canGoNext = computed(() => {
      return currentIndex.value < films.value.length - itemsPerPage;
    });

    const canGoPrevious = computed(() => {
      return currentIndex.value > 0;
    });

    const nextSlide = () => {
      if (canGoNext.value) {
        currentIndex.value++;
      }
    };

    const previousSlide = () => {
      if (canGoPrevious.value) {
        currentIndex.value--;
      }
    };

    const goToProjects = () => {
      router.push('/projects');
    };

    const trackStyle = computed(() => ({
      transform: `translateX(calc(-${currentIndex.value * (100 / itemsPerPage)}% + ${dragDelta.value}px))`,
      transition: dragStartX.value === null ? 'transform 0.5s cubic-bezier(.77,0,.18,1)' : 'none'
    }));

    // Drag/Swipe handlers
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

    onMounted(() => {
      films.value = filmsData;
    });

    return {
      films,
      currentIndex,
      canGoNext,
      canGoPrevious,
      nextSlide,
      previousSlide,
      goToProjects,
      trackStyle,
      currentFilms,
      startDrag,
      onDrag,
      endDrag
    };
  }
});
</script>

<style>
.projects-page-film-centered {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(0deg, #000 0%, #000 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow-x: hidden;
}

.header {
  width: 100%;
  max-width: 1728px;
  margin: 0 auto;
  position: relative;
}

.projects-cta {
  position: absolute;
  top: 40px;
  left: 60px;
  z-index: 10;
}

.released-projects {
  color: #fff;
  font-family: "Right Grotesk-Medium", Helvetica;
  font-size: 36px;
  font-weight: 500;
  text-align: center;
  margin-top: 60px;
  margin-bottom: 20px;
}

.carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1400px;
  max-width: 90vw;
  margin: 0 auto;
  position: relative;
  height: 700px;
  user-select: none;
  touch-action: pan-y;
}

.carousel-arrow {
  background: none;
  border: none;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: background 0.2s;
}
.carousel-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.arrow-icon {
  width: 40px;
  height: 40px;
  color: #fff;
}

.carousel-arrow-left {
  position: absolute;
  left: -80px;
  top: 50%;
  transform: translateY(-50%);
}
.carousel-arrow-right {
  position: absolute;
  right: -80px;
  top: 50%;
  transform: translateY(-50%);
}

.carousel-track {
  display: flex;
  transition: transform 0.5s cubic-bezier(.77,0,.18,1);
  width: 100%;
  height: 700px;
  overflow: hidden;
  will-change: transform;
}

.carousel-item {
  min-width: calc(100% / 3);
  max-width: calc(100% / 3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
  box-sizing: border-box;
}

.film-poster-img {
  width: 100%;
  max-width: 420px;
  height: 620px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  margin-bottom: 18px;
  transition: box-shadow 0.2s;
}

.carousel-film-title {
  color: #fff;
  font-family: "Neue Montreal-Regular", Helvetica, Arial, sans-serif;
  font-size: 22px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 10px;
}

.projects-title-font {
  font-family: "Right Grotesk-Medium", Helvetica, Arial, sans-serif;
  font-size: 36px;
  font-weight: 500;
  letter-spacing: 0.08px;
  text-transform: uppercase;
  color: #fff;
  text-align: center;
  margin-bottom: 10px;
}

.projects {
  color: #ffffff;
  font-family: "Right Grotesk-SpatialBlack", Helvetica;
  font-size: 80px;
  font-weight: 900;
  margin-left: 42px;
  margin-bottom: 8px;
  letter-spacing: 0;
  line-height: 1;
  height: 110px;
  display: flex;
  align-items: flex-end;
  text-align: left;
}

.film-series-title {
  margin-top: 60px;
  margin-bottom: 8px;
  text-align: left;
  justify-content: flex-start;
  margin-left: 42px;
}

.film-title {
  display: none; /* Hide the subheading */
}

.film-series-heading {
  width: 100%;
  height: 106px;
  font-family: "Right Grotesk", Helvetica, Arial, sans-serif;
  font-size: 100px;
  font-weight: 900;
  line-height: 1.1;
  color: white;
  letter-spacing: 0;
  word-wrap: break-word;
  text-transform: uppercase;
  margin-top: 144px;
  margin-bottom: 0;
  text-align: left;
  margin-left: 42px;
}
</style>
