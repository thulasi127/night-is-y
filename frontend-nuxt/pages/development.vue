<template>
  <div class="projects-page-dev centered-layout">
    <NavBar />
    <div class="dev-header-row">
      <div class="projects-cta cta-hover" @click="goToProjects">
        <ChevronLeftIcon class="chevron-left-small" />
        <span class="projects-text">PROJECTS</span>
      </div>
      <div class="dev-title">IN DEVELOPMENT</div>
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
/* Keep your existing dev-page styles */
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
  margin-top: 32px;
  margin-bottom: 40px;
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
}

.dev-title {
  margin: 0 auto;
  color: #fff;
  font-family: "anton", sans-serif;
  font-size: 48px;
  font-weight: 300;
  line-height: 1.1;
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
  font-family: "proxima-nova", sans-serif;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 15px;
}
</style>
