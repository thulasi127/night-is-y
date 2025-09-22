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
        v-for="(project, idx) in projects"
        :key="project.id"
        class="poster-image-wrapper"
        @mouseenter="hovered = idx"
        @mouseleave="hovered = null"
        @click="openModal(project, $event)"
        ref="posterRefs"
        style="cursor:pointer"
      >
        <div class="image">
          <img
            class="img"
            :class="{ 'poster-hovered': hovered === idx }"
            :src="project.poster"
            :alt="project.title"
          />
          <div v-if="hovered === idx" class="poster-overlay immediate center-overlay">
            <div class="poster-title-neue">{{ displayTitle(project) }}</div>
            <div class="poster-type-neue">
              {{ project.type ? project.type : 'Film' }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      class="arrow arrow-left cta-hover"
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
    <DevModal
      v-if="modalOpen && modalProject"
      :project="modalProject"
      :close="closeModal"
      :posterRect="posterRect"
    />

  </div>
</template>

<script lang="ts">

useHead({
  title: 'Development Projects | NIGHT is Y',
  meta: [{ name: 'description', content: 'Development projects by NIGHT is Y.' }]
})

import { defineComponent, ref, computed, onMounted } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";
import NavBar from "../components/NavBar.vue";
import devData from '~/data/dev.json';
import { useRouter } from 'vue-router';
import DevModal from "~/components/DevModal.vue";

export default defineComponent({
  name: "ProjectsPageDev",
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
    NavBar,
    DevModal,
  },
  setup() {
    const projects = ref([]);
    const currentIndex = ref(0);
    const itemsPerPage = 3;
    const hovered = ref<number | null>(null);
    const router = useRouter();
    const modalOpen = ref(false);
    const modalProject = ref<any>(null);
    const posterRect = ref<any>(null);

    // Drag/swipe state
    const dragStartX = ref<number | null>(null);
    const dragDelta = ref(0);

    onMounted(() => {
      projects.value = devData;
    });

    // Helper function to concatenate title and release_date
    const displayTitle = (project: { title: string; release_date?: string }) => {
      return project.release_date ? `${project.title} (${project.release_date})` : project.title;
    };

    const visibleProjects = computed(() =>
      projects.value.slice(currentIndex.value, currentIndex.value + itemsPerPage)
    );

    const canGoPrevious = computed(() => currentIndex.value > 0);
    const canGoNext = computed(
      () => currentIndex.value + itemsPerPage < projects.value.length
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

    const openModal = (project: any, event: MouseEvent) => {
      const rect = event.currentTarget.getBoundingClientRect();
      modalProject.value = project;
      posterRect.value = rect;
      modalOpen.value = true;
    };
    const closeModal = () => {
      modalOpen.value = false;
      modalProject.value = null;
    };

    return {
      projects,
      visibleProjects,
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
      modalProject,
      posterRect
    };
  }
});
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";
import NavBar from "../components/NavBar.vue";
import devData from '~/data/dev.json';
import { useRouter } from 'vue-router';
import DevModal from "~/components/DevModal.vue";

const projects = ref([]);
const currentIndex = ref(0);
const itemsPerPage = 3;
const hovered = ref<number | null>(null);
const router = useRouter();
const modalOpen = ref(false);
const modalProject = ref<any>(null);
const posterRect = ref<any>(null);

// Drag/swipe state
const dragStartX = ref<number | null>(null);
const dragDelta = ref(0);

onMounted(() => {
  projects.value = devData;
});

// Helper function to concatenate title and release_date
const displayTitle = (project: { title: string; release_date?: string }) => {
  return project.release_date ? `${project.title} (${project.release_date})` : project.title;
};

const visibleProjects = computed(() =>
  projects.value.slice(currentIndex.value, currentIndex.value + itemsPerPage)
);

const canGoPrevious = computed(() => currentIndex.value > 0);
const canGoNext = computed(
  () => currentIndex.value + itemsPerPage < projects.value.length
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

const openModal = (project: any, event: MouseEvent) => {
  const rect = event.currentTarget.getBoundingClientRect();
  modalProject.value = project;
  posterRect.value = rect;
  modalOpen.value = true;
};
const closeModal = () => {
  modalOpen.value = false;
  modalProject.value = null;
};
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

.dev-title {
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
  padding: 0 100px;             /* Padding for arrows */
  width: 100%;
  max-width: 1728px;
  height: 670px;
  margin: 0 auto;
  box-sizing: border-box;
}

.poster-image-wrapper {
  margin-left: 0;               /* No extra margin */
}

.poster-image-wrapper:first-child {
  margin-left: 0;               /* No extra margin for first poster */
}

/* Responsive adjustment */
@media (max-width: 768px) {
  .poster-image-wrapper:first-child {
    margin-left: 24px;
  }
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

.modal-project-details {
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

.modal-summary {
  font-size: 18px;
  font-weight: 400;
  margin: 0 0 16px 0;
  text-align: center;
}

.modal-type, .modal-release_date {
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


/* New styles for DevModal */

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