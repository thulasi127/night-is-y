<template>
  <div class="projects-page-film centered-layout">
    <NavBar />
    <div class="film-series-header-row">
      <div class="projects-cta cta-hover" @click="goToProjects">
        <ChevronLeftIcon class="chevron-left-small" />
        <span class="projects-text">PROJECTS</span>
      </div>
      <div class="film-series-title">FILM &amp; SERIES</div>
    </div>

    <!-- Carousel integration -->
    <Carousel
      v-if="films.length > 0"
      :items="films"
      @onPosterClick="openModal"
    />

    <FilmModal
      v-if="modalOpen && modalFilm"
      :film="modalFilm"
      :close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import NavBar from "../components/NavBar.vue";
import Carousel from "../components/Carousel.vue";
import FilmModal from "../components/FilmModal.vue";
import filmsData from "../data/films.json";
import { useRouter } from "vue-router";
import { ChevronLeftIcon } from "@heroicons/vue/24/solid";

const films = ref([]);
const modalOpen = ref(false);
const modalFilm = ref(null);
const router = useRouter();

onMounted(() => {
  films.value = filmsData.sort((a, b) => b.year - a.year);
});

function goToProjects() {
  router.push("/projects");
}

function openModal(film, event) {
  modalFilm.value = film;
  modalOpen.value = true;
}

function closeModal() {
  modalOpen.value = false;
  modalFilm.value = null;
}
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
  margin-top: 24px;    /* reduced from 32px */
  margin-bottom: 24px; /* reduced from 40px */
  position: relative;
}

.film-series-title {
  margin: 0 auto;
  margin-top: 40px;    /* reduced from 80px */
  color: #fff;
  font-family: "anton", sans-serif;
  font-size: 40px;     /* reduced from 48px */
  font-weight: 300;
  line-height: 1.1;
  text-transform: uppercase;
  text-align: center;
  z-index: 2;
  white-space: nowrap;
}

.projects-cta {
  position: absolute;
  left: 192px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  z-index: 10;
  pointer-events: auto;
  margin-top: 80px; /* Same spacing as FILM & SERIES title */
}

.projects-cta-button {
  /* Add any additional styles for the button here */
}

.projects-cta-button,
.projects-cta-button *,
.arrow:enabled .arrow-icon,
.arrow:enabled:hover .arrow-icon,
.close-modal-button svg {
  transition: filter 0.12s; /* fast transition for instant revert */
}

.projects-cta-button:hover,
.projects-cta-button:hover *,
.arrow:enabled:hover .arrow-icon,
.close-modal-button:hover svg {
  filter: brightness(0.7);
}

.film-series-title {
  margin: 0 auto;
  color: #fff;
  font-family: "anton", sans-serif;
  font-size: 48px;
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: 0;
  text-transform: uppercase;
  text-align: center;
  z-index: 2;
  white-space: nowrap;
  flex: 1;
  margin-top: 80px; /* Pushes it down on desktop */
}

@media (max-width: 1024px) {
  .film-series-title {
    margin-top: 120px; /* More space on smaller screens to prevent overlap */
  }

  .projects-cta {
    margin-top: 120px; /* More space for smaller screens */
  }
}

.chevron-left-small {
  width: 22px;
  height: 22px;
  color: #fff;
}

.projects-text {
  color: #fff;
  font-family: "proxima-nova", sans-serif;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 15px;
}

.posters-row {
  display: flex;
  justify-content: center;      /* Center posters horizontally */
  align-items: center;          /* Center posters vertically */
  gap: 48px;
  padding-left: 100px;          /* Space for left arrow */
  padding-right: 100px;         /* Space for right arrow */
  width: 100%;
  box-sizing: border-box;
  min-height: 670px;
  overflow: hidden;
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
  font-family: "proxima-nova", sans-serif;
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
  font-family: "proxima-nova", sans-serif;
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
  position: absolute;
  left: 67px;
  top: 50%;
  transform: translateY(-50%);
}
.arrow-right {
  position: absolute;
  right: 67px;
  top: 50%;
  transform: translateY(-50%);
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



.frame {
  position: relative;
  width: 80%;
  max-width: 1200px;
  background: #111;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}


/* New styles for FilmModal */

.frame .rotten-tomatoes {
  aspect-ratio: 0.95;
  height: 18px;
  object-fit: cover;
  width: 17px;
  margin-left: 8px;
  vertical-align: middle;
}

.arrow:enabled .arrow-icon,
.arrow:enabled:hover .arrow-icon {
  transition: filter 0.15s;
}

.arrow:enabled:hover .arrow-icon {
  filter: brightness(0.7); /* dims arrow icon on hover */
}
</style>