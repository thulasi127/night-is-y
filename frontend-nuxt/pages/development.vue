<template>
  <div class="projects-page-dev centered-layout">
    <NavBar />
    <div class="dev-header-row">
      <div class="projects-cta cta-hover" @click="goToProjects">
        <ChevronLeftIcon class="chevron-left-small" />
        <span class="projects-text">PROJECTS</span>
      </div>
      <div class="page-title">IN DEVELOPMENT</div>
    </div>

    <!-- Reusable Carousel -->
    <Carousel
      v-if="projects.length > 0"
      :items="projects"
      @onPosterClick="openModal"
    />

    <!-- Dev Modal -->
    <DevModal
      v-if="modalOpen && modalProject"
      :project="modalProject"
      :close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ChevronLeftIcon } from "@heroicons/vue/24/solid";
import NavBar from "../components/NavBar.vue";
import Carousel from "../components/Carousel.vue"; // ✅ Import your reusable Carousel
import DevModal from "../components/DevModal.vue";
import devData from "~/data/dev.json";
import { useRouter } from "vue-router";

const projects = ref([]);
const modalOpen = ref(false);
const modalProject = ref(null);
const router = useRouter();

onMounted(() => {
  projects.value = devData; // Load dev projects
});

function goToProjects() {
  router.push("/projects");
}

function openModal(project) {
  modalProject.value = project;
  modalOpen.value = true;
}

function closeModal() {
  modalOpen.value = false;
  modalProject.value = null;
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

.dev-header-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 24px;    /* reduced from 32px */
  margin-bottom: 24px; /* reduced from 40px */
  position: relative;
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

@media (max-width: 1024px) {
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


/* New styles for MusicVideoModal */

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