<template>
  <div class="development-page">
    <NavBar />
    <div class="development-content">
      <h1 class="development-title">IN DEVELOPMENT</h1>
      <div class="dev-grid">
        <div
          v-for="(project, i) in projects"
          :key="project.id"
          class="dev-poster"
          @click="openModal(project, $event)"
        >
          <img :src="project.poster" :alt="project.title" />
        </div>
        <DevModal
          v-if="showModal"
          :project="selectedProject"
          :posterRect="posterRect"
          @close="showModal = false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NavBar from '@/components/NavBar.vue';
import DevModal from '@/components/DevModal.vue';

const projects = ref([]);
const showModal = ref(false);
const selectedProject = ref(null);
const posterRect = ref(null);

onMounted(async () => {
  const res = await fetch('/data/dev.json');
  projects.value = await res.json();
});

function openModal(project, event) {
  posterRect.value = event.currentTarget.getBoundingClientRect();
  selectedProject.value = project;
  showModal.value = true;
}
</script>

<style scoped>
/* Copy and adapt styles from film-series.vue as needed */
</style>