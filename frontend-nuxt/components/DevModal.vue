<template>
  <transition name="modal-fade">
    <div class="dev-modal-overlay" @click.self="close">
      <div class="frame" role="dialog" aria-modal="true">
        <!-- Use project fields just like FilmModal uses film fields -->
        <img :src="project.poster" :alt="project.title" class="modal-poster" />
        <h2 class="modal-title">{{ project.title }}</h2>
        <p class="modal-description">{{ project.description }}</p>
        <!-- Add more fields as needed -->
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  project: Object,
  close: Function,
  posterRect: Object
});
</script>

<style scoped>
/* Copy and adapt styles from FilmModal.vue as needed */
</style>