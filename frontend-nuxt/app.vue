<template>
  <div id="app">
    <!-- Global fallback -->
    <div v-if="!isMounted" class="global-fallback" />

    <NuxtPage />
    <Footer v-if="showFooter" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import Footer from "@/components/Footer.vue"

const route = useRoute()

const showFooter = computed(() =>
  ["/home", "/about", "/projects", "/press", "/contact"].includes(route.path)
)

/* Global mount flag for fallback */
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})
</script>

<style>
.global-fallback {
  position: fixed;
  inset: 0;
  background: black;
  z-index: 0;
}
</style>