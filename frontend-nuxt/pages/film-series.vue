<template>
  <div class="projects-page-film centered-layout">
    <NavBar />
    <div class="film-series-header-row">
      <div class="projects-cta cta-hover" @click="goToProjects">
        <ChevronLeftIcon class="chevron-left-small" />
        <span class="projects-text">PROJECTS</span>
      </div>
      <div class="page-title">FILM &amp; SERIES</div>
    </div>

    <!-- Carousel integration (client-only to avoid SSR window error) -->

      <Carousel
        v-if="films.length > 0"
        :items="films"
        @onPosterClick="openModal"
      />
    </ClientOnly>

    <FilmModal
      v-if="modalOpen && modalFilm"
      :film="modalFilm"
      :close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue"
import { useAsyncData, useHead } from "#app"
import NavBar from "../components/NavBar.vue"
import Carousel from "../components/Carousel.vue"
import FilmModal from "../components/FilmModal.vue"
import { useRouter } from "vue-router"
import { ChevronLeftIcon } from "@heroicons/vue/24/solid"
import { sanityClient } from "~/utils/sanityClient"

const router = useRouter()
const modalOpen = ref(false)
const modalFilm = ref(null)

const query = `*[_type == "filmSeriesPage" && _id == "film-series-page"][0]{
  films[]{
    title,
    year,
    duration,
    description,
    trailer,
    credits[]{
      role,
      people[]{
        name,
        imdb
      }
    },
    awardsAndNominations,
    articles,
    laurels[]{
      name,
      shouldDisplay,
      "img": img.asset->url
    },
    "poster": poster.asset->url
  }
}`

const { data } = await useAsyncData("filmSeries", async () => {
  const result = await sanityClient().fetch(query)
  return result || { films: [] }
})

const films = computed(() => {
  const items = data.value?.films || []
  return [...items].sort((a, b) => (b.year || 0) - (a.year || 0))
})

function goToProjects() {
  router.push("/projects")
}

function openModal(film) {
  modalFilm.value = film
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
  modalFilm.value = null
}

useHead({
  title: "Film & Series | Night is Y",
  meta: [{ name: "description", content: "Film and series by Night is Y." }],
})
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

.page-title {
  margin: 0 auto;
  color: #fff;
  font-family: "anton", sans-serif;
  font-size: clamp(1.8rem, 2.9vw, 2.4rem);
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

.music-videos-title {
  margin: 0 auto;
  color: #fff;
  font-family: "anton", sans-serif;
  font-size: clamp(1.8rem, 2.9vw, 2.4rem);
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
  border-radius: 0 !important;
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

/* ---------- Large Laptops (≤1440px) ---------- */
@media (max-width: 1440px) {
  .film-series-title,
  .music-videos-title,
  .page-title {
    font-size: 42px;
  }

  .projects-text {
    font-size: 18px;
  }

  .img {
    height: 560px;
    width: 380px;
  }
}

/* ---------- Tablets & Small Laptops (≤1024px) ---------- */
@media (max-width: 1024px) {

  .film-series-title,
  .music-videos-title,
  .page-title {
    font-size: 36px;
    margin-top: 120px; /* Add this line */
  }

  .projects-text {
    display: none;
  }

  .projects-cta {
    gap: 0;
    left: 32px;
    margin-top: 120px; /* Add this line */
  }

  .chevron-left-small {
    width: 28px;
    height: 28px;
  }
}

/* ---------- Small Tablets & Large Phones (≤730px) ---------- */
@media (max-width: 730px) {
  .film-series-title,
  .music-videos-title,
  .page-title {
    font-size: 32px;
  }

  .chevron-left-small {
    width: 26px;
    height: 26px;
  }
}

/* ---------- Phones (≤480px) ---------- */
@media (max-width: 480px) {

  .page-title {
    font-size: 28px;
  }

  .chevron-left-small {
    width: 24px;
    height: 24px;
  }

  /* Remove margin so nothing overlaps */
  .projects-cta {
    margin-top: 60px;
  }
}

/* ---------- Hide left arrow below 500px ---------- */
@media (max-width: 500px) {
  .projects-cta {
    display: none;
  }
}

/* Large phones / small tablets */
@media (max-width: 768px) {
  .img {
    height: 360px;
    width: 240px;
  }
}

/* Phones */
@media (max-width: 480px) {
  .img {
    height: 280px;
    width: 190px;
  }
}

/* Small phones */
@media (max-width: 380px) {
  .img {
    height: 230px;
    width: 160px;
  }
}

</style>