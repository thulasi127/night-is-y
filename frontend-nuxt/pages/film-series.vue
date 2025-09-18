<template>
  <div class="projects-page-film" data-model-id="19:1326">
    <img
      class="IMG"
      alt="Img"
      src="https://c.animaapp.com/8fMaI8OW/img/img-3986-1.png"
    />
    <div class="released-projects">FILM & SERIES</div>
    <div class="film-title">{{ currentFilms[0]?.title || '' }}</div>
    
    <div class="carousel-container">
      <div 
        v-for="(film, index) in currentFilms" 
        :key="film.id"
        :class="['film-poster', `poster-${index + 1}`]"
      >
        <img
          :src="film.poster"
          :alt="film.title"
        />
      </div>
    </div>

    <div 
      class="arrow-right"
      :class="{ 'arrow-disabled': !canGoNext }"
      @click="nextSlide"
    >
      <ChevronRightIcon class="arrow-icon" />
    </div>
    
    <div 
      class="arrow-left"
      :class="{ 'arrow-disabled': !canGoPrevious }"
      @click="previousSlide"
    >
      <ChevronLeftIcon class="arrow-icon" />
    </div>
    <div class="projects-cta">
      <ChevronLeft class="chevron-icon" />
      <span class="projects-text">PROJECTS</span>
    </div>
    <div class="header">
      <div class="section">
        <img
          class="c-ontact"
          alt="C ontact"
          src="https://c.animaapp.com/8fMaI8OW/img/contact-2.png"
        />
        <img
          class="press"
          alt="Press"
          src="https://c.animaapp.com/8fMaI8OW/img/press-2.png"
        />
        <img
          class="work"
          alt="Work"
          src="https://c.animaapp.com/8fMaI8OW/img/work.png"
        />
        <img
          class="about"
          alt="About"
          src="https://c.animaapp.com/8fMaI8OW/img/about-2.png"
        />
        <img
          class="NIGHT-IS-y"
          alt="Night IS y"
          src="https://c.animaapp.com/8fMaI8OW/img/night-is-y.png"
        />
      </div>
      <img
        class="img-2"
        alt="Image"
        src="https://c.animaapp.com/8fMaI8OW/img/rectangle@2x.png"
      />
      <div class="div">
        <div class="section">
          <img
            class="c-ontact"
            alt="C ontact"
            src="https://c.animaapp.com/8fMaI8OW/img/contact-2.png"
          />
          <img
            class="press"
            alt="Press"
            src="https://c.animaapp.com/8fMaI8OW/img/press-2.png"
          />
          <img
            class="work"
            alt="Work"
            src="https://c.animaapp.com/8fMaI8OW/img/work-1.png"
          />
          <img
            class="about"
            alt="About"
            src="https://c.animaapp.com/8fMaI8OW/img/about-2.png"
          />
          <img
            class="NIGHT-IS-y"
            alt="Night IS y"
            src="https://c.animaapp.com/8fMaI8OW/img/night-is-y-2.png"
          />
        </div>
        <img
          class="img-2"
          alt="Image"
          src="https://c.animaapp.com/8fMaI8OW/img/rectangle@2x.png"
        />
      </div>
      <div class="div">
        <div class="section">
          <img
            class="c-ontact"
            alt="C ontact"
            src="https://c.animaapp.com/8fMaI8OW/img/contact-2.png"
          />
          <img
            class="press"
            alt="Press"
            src="https://c.animaapp.com/8fMaI8OW/img/press-2.png"
          />
          <img
            class="work-2"
            alt="Work"
            src="https://c.animaapp.com/8fMaI8OW/img/work-2.png"
          />
          <img
            class="about"
            alt="About"
            src="https://c.animaapp.com/8fMaI8OW/img/about-2.png"
          />
          <img
            class="NIGHT-IS-y"
            alt="Night IS y"
            src="https://c.animaapp.com/8fMaI8OW/img/night-is-y-2.png"
          />
        </div>
        <img
          class="img-2"
          alt="Rectangle"
          src="https://c.animaapp.com/8fMaI8OW/img/rectangle@2x.png"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";
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
    ChevronRightIcon
  },
  setup() {
    const films = ref<Film[]>([]);
    const currentIndex = ref(0);
    const itemsPerPage = 3;

    const currentFilms = computed(() => {
      const start = currentIndex.value * itemsPerPage;
      return films.value.slice(start, start + itemsPerPage);
    });

    const canGoNext = computed(() => {
      return (currentIndex.value + 1) * itemsPerPage < films.value.length;
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

    onMounted(() => {
      films.value = filmsData;
    });

    return {
      currentFilms,
      canGoNext,
      canGoPrevious,
      nextSlide,
      previousSlide
    };
  }
});
</script>

<style>
.projects-page-film {
  background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%);
  min-height: 1080px;
  min-width: 1728px;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.projects-page-film .IMG {
  aspect-ratio: 1.77;
  height: 1080px;
  left: -1728px;
  object-fit: cover;
  position: absolute;
  top: -5787px;
  width: 1909px;
}

.projects-page-film .released-projects {
  color: #ffffff;
  font-family: "Right Grotesk-Medium", Helvetica;
  font-size: 36px;
  font-weight: 500;
  left: 593px;
  letter-spacing: 0;
  line-height: 30px;
  position: absolute;
  text-align: center;
  top: 183px;
  white-space: nowrap;
  width: 541px;
}

.projects-page-film .film-title {
  color: transparent;
  font-family: "Helvetica Neue-UltraLight", Helvetica;
  font-size: 28px;
  font-weight: 300;
  left: 593px;
  letter-spacing: 0;
  line-height: 30px;
  position: absolute;
  text-align: center;
  top: 978px;
  white-space: nowrap;
  width: 541px;
}

.projects-page-film .carousel-container {
  position: relative;
  width: 100%;
  height: 670px;
}

.projects-page-film .film-poster {
  position: absolute;
  top: 275px;
  transition: all 0.3s ease;
}

.projects-page-film .film-poster img {
  aspect-ratio: 0.68;
  height: 670px;
  object-fit: cover;
  width: 100%;
}

.projects-page-film .poster-1 {
  left: 143px;
  width: 455px;
}

.projects-page-film .poster-1 img {
  height: 670px;
  width: 455px;
}

.projects-page-film .poster-2 {
  left: 641px;
  width: 447px;
}

.projects-page-film .poster-2 img {
  height: 662px;
  width: 447px;
}

.projects-page-film .poster-3 {
  left: 1138px;
  width: 447px;
}

.projects-page-film .poster-3 img {
  height: 662px;
  width: 447px;
}

.projects-page-film .arrow-right {
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 60px;
  justify-content: center;
  left: 1597px;
  position: absolute;
  top: 576px;
  transition: all 0.3s ease;
  width: 68px;
}

.projects-page-film .arrow-right:hover:not(.arrow-disabled) {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.projects-page-film .arrow-left {
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 60px;
  justify-content: center;
  left: 67px;
  position: absolute;
  top: 576px;
  transition: all 0.3s ease;
  width: 68px;
}

.projects-page-film .arrow-left:hover:not(.arrow-disabled) {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.projects-page-film .arrow-disabled {
  cursor: not-allowed;
  opacity: 0.3;
}

.projects-page-film .arrow-disabled:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  transform: none !important;
}

.projects-page-film .arrow-icon {
  color: white;
  height: 24px;
  width: 24px;
}

.projects-page-film .projects-cta {
  align-items: center;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  font-family: "Neue Montreal-Regular", Helvetica;
  font-size: 20px;
  font-weight: 400;
  gap: 8px;
  left: 147px;
  letter-spacing: 0.08px;
  line-height: 15px;
  position: absolute;
  top: 210px;
  transition: opacity 0.2s ease;
}

.projects-page-film .projects-cta:hover {
  opacity: 0.8;
}

.projects-page-film .chevron-icon {
  height: 22px;
  width: 22px;
}

.projects-page-film .projects-text {
  white-space: nowrap;
}

.projects-page-film .header {
  height: 132px;
  left: 0;
  position: absolute;
  top: 10px;
  width: 1728px;
}

.projects-page-film .section {
  height: 65px;
  left: 42px;
  position: absolute;
  top: 43px;
  width: calc(100% - 84px);
}

.projects-page-film .c-ontact {
  height: 49.77%;
  left: 94.57%;
  position: absolute;
  top: 16.74%;
  width: 5.41%;
}

.projects-page-film .press {
  height: 49.77%;
  left: 88.85%;
  position: absolute;
  top: 16.74%;
  width: 5.41%;
}

.projects-page-film .work {
  height: 49.77%;
  left: 82.31%;
  position: absolute;
  top: 16.74%;
  width: 5.41%;
}

.projects-page-film .about {
  height: 49.77%;
  left: 75.52%;
  position: absolute;
  top: 16.74%;
  width: 5.41%;
}

.projects-page-film .NIGHT-IS-y {
  height: 49.23%;
  left: 46.50%;
  position: absolute;
  top: 13.19%;
  width: 8.52%;
}

.projects-page-film .img-2 {
  aspect-ratio: 0.89;
  height: 138px;
  left: 42px;
  object-fit: cover;
  position: absolute;
  top: 39px;
  width: 123px;
}

.projects-page-film .div {
  height: 132px;
  left: 0;
  position: absolute;
  top: 0;
  width: 1728px;
}

.projects-page-film .work-2 {
  height: 49.77%;
  left: 82.29%;
  position: absolute;
  top: 16.71%;
  width: 5.41%;
}
</style>
