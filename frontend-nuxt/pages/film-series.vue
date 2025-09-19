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
        @click="openModal(film)"
        style="cursor:pointer"
      >
        <div class="image">
          <img
            class="img"
            :class="{ 'poster-hovered': hovered === idx }"
            :src="film.poster"
            :alt="film.title"
          />
          <div v-if="hovered === idx" class="poster-overlay immediate center-overlay">
            <div class="poster-title-neue">{{ displayTitle(film) }}</div>
            <div class="poster-type-neue">
              {{ film.type ? film.type : 'Film' }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal test -->
    <div v-if="modalOpen" class="test-modal-overlay">
      <div class="test-modal-content">
        <div class="modal-film-details">
          <img v-if="modalFilm.poster" :src="modalFilm.poster" alt="Film Poster" class="modal-poster" />
          <div class="modal-text">
            <h2 class="modal-title">{{ modalFilm.title }}</h2>
            <p class="modal-description">{{ modalFilm.description }}</p>
            <p class="modal-type">{{ modalFilm.type }}</p>
            <p class="modal-year">{{ modalFilm.year }}</p>
          </div>
        </div>
        <button @click="closeModal" style="margin-left:16px;">Close</button>
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
    <div v-if="modalOpen && modalFilm" class="film-modal-overlay" @click.self="closeModal">
      <div class="frame">
        <img class="image" :alt="modalFilm.title" :src="modalFilm.poster" />
        <div class="text-wrapper">{{ modalFilm.title }}</div>
        <button class="size-48" @click="closeModal" aria-label="Close" style="background:none;border:none;position:absolute;top:43px;left:1495px;color:#F5F5F5;font-size:2rem;cursor:pointer;">×</button>
        <div class="element">{{ modalFilm.subtitle }}</div>
        <img v-if="modalFilm.gallery && modalFilm.gallery[1]" class="img" :alt="modalFilm.title" :src="modalFilm.gallery[1]" />
        <p class="div">{{ modalFilm.description }}</p>
        <p class="director-info">
          <span class="span">DIRECTOR | </span>
          <a :href="modalFilm.director.imdb" target="_blank" rel="noopener noreferrer">
            <span class="text-wrapper-2">{{ modalFilm.director.name }}</span>
          </a>
        </p>
        <p class="writers-info">
          <span class="span">WRITERS | </span>
          <template v-for="(writer, i) in modalFilm.writers" :key="i">
            <a :href="writer.imdb" target="_blank" rel="noopener noreferrer">
              <span class="text-wrapper-2">{{ writer.name }}</span>
            </a>
            <span v-if="i < modalFilm.writers.length - 1" class="span"> • </span>
          </template>
        </p>
        <iframe
          class="trailer-video"
          :src="modalFilm.trailer"
          title="Trailer"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <div class="awards-accolades">{{ modalFilm.awards }}</div>
        <!-- Add KeyboardArrowDown if you want -->
      </div>
    </div>
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
    const modalOpen = ref(false);
    const modalFilm = ref<any>(null);

    // Drag/swipe state
    const dragStartX = ref<number | null>(null);
    const dragDelta = ref(0);

    onMounted(() => {
      films.value = filmsData;
    });

    // Helper function to concatenate title and year
    const displayTitle = (film: { title: string; year?: string }) => {
      return film.year ? `${film.title} (${film.year})` : film.title;
    };

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

    // Ensure CTA leads to /projects page
    const goToProjects = () => {
      router.push('/projects');
    };

    const openModal = (film: any) => {
      modalFilm.value = film;
      modalOpen.value = true;
    };
    const closeModal = () => {
      modalOpen.value = false;
      modalFilm.value = null;
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
      goToProjects,
      displayTitle,
      modalOpen,
      openModal,
      closeModal,
      modalFilm
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
  z-index: 10; /* Ensure it's above other elements */
  pointer-events: auto;
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

/* Add these styles at the end of your style block */
.test-modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.7);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.test-modal-content {
  background: #222;
  color: #fff;
  padding: 48px 32px;
  border-radius: 16px;
  font-size: 2rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
}

.modal-film-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
}

.modal-poster {
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 16px;
  margin-bottom: 16px;
}

.modal-title {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.modal-description {
  font-size: 18px;
  font-weight: 400;
  margin: 0 0 16px 0;
  text-align: center;
}

.modal-type, .modal-year {
  font-size: 16px;
  font-weight: 500;
  margin: 0;
}

.film-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.frame {
  position: relative;
  width: 80%;
  max-width: 1200px;
  background: #111;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.text-wrapper {
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  color: #fff;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  z-index: 10;
}

.size-48 {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: #f5f5f5;
  font-size: 2rem;
}

.element {
  margin: 16px 0;
  color: #fff;
  font-size: 18px;
  text-align: center;
}

.rectangle {
  width: 100%;
  height: auto;
  margin: 16px 0;
}

.awards-accolades {
  color: #fff;
  font-size: 16px;
  text-align: center;
  margin-top: 8px;
}

/* New styles for FilmModal */
.film-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.frame {
  background-color: rgba(0, 0, 0, 0.85);
  height: 812px;
  position: relative;
  width: 1580px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
}
.frame .image {
  aspect-ratio: 0.68;
  height: 400px;
  left: 40px;
  position: absolute;
  top: 20px;
  width: 272px;
  object-fit: cover;
}
.frame .text-wrapper {
  color: #ffffff;
  font-family: "Neue Montreal-Regular", Helvetica;
  font-size: 48px;
  font-weight: 400;
  left: 340px;
  letter-spacing: 0;
  line-height: 52px;
  position: absolute;
  top: 20px;
  white-space: nowrap;
  width: 500px;
}
.frame .x-instance {
  height: 30px !important;
  left: 1520px !important;
  top: 20px !important;
  width: 30px !important;
  position: absolute !important;
}
.frame .element {
  align-items: center;
  color: #ffffff;
  display: flex;
  font-family: "Neue Montreal-Regular", Helvetica;
  font-size: 16px;
  font-weight: 400;
  height: 20px;
  justify-content: flex-start;
  left: 340px;
  letter-spacing: 0.08px;
  line-height: 20px;
  position: absolute;
  top: 80px;
  width: 400px;
}
.frame .rotten-tomatoes {
  aspect-ratio: 0.95;
  height: 18px;
  object-fit: cover;
  width: 17px;
  margin-left: 8px;
  vertical-align: middle;
}
.frame .div {
  color: #ffffff;
  font-family: "Neue Montreal-Regular", Helvetica;
  font-size: 16px;
  font-weight: 400;
  left: 340px;
  letter-spacing: 0;
  line-height: 24px;
  position: absolute;
  top: 120px;
  width: 800px;
}
.frame .director-info {
  color: #ffffff;
  font-family: "Neue Montreal-Regular", Helvetica;
  font-size: 16px;
  font-weight: 400;
  left: 340px;
  letter-spacing: 0;
  line-height: 24px;
  position: absolute;
  top: 220px;
  width: 600px;
  margin: 0;
}
.frame .writers-info {
  color: #ffffff;
  font-family: "Neue Montreal-Regular", Helvetica;
  font-size: 16px;
  font-weight: 400;
  left: 340px;
  letter-spacing: 0;
  line-height: 24px;
  position: absolute;
  top: 250px;
  width: 600px;
  margin: 0;
}
.frame .span {
  color: #ffffff;
  font-family: "Neue Montreal-Regular", Helvetica;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0;
}
.frame .text-wrapper-2 {
  color: #ffffff;
  font-family: "Neue Montreal-Regular", Helvetica;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0;
  text-decoration: none;
}
.frame .trailer-video {
  height: 400px;
  left: 340px;
  position: absolute;
  top: 290px;
  width: 800px;
  border: none;
  border-radius: 8px;
}
.frame .awards-accolades {
  align-items: center;
  color: #ffffff;
  display: flex;
  font-family: "Neue Montreal-Medium", Helvetica;
  font-size: 14px;
  font-weight: 500;
  height: 39px;
  justify-content: center;
  left: 650px;
  letter-spacing: 0.10px;
  line-height: 20px;
  position: absolute;
  text-align: center;
  top: 700px;
  width: 181px;
}
.frame .keyboard-arrow-down-instance {
  left: 740px !important;
  top: 720px !important;
  position: absolute !important;
}
</style>