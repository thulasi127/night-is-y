<template>
  <div id="app">
    <NuxtPage />
    <Footer v-if="showFooter" />  <!-- Only renders on selected pages -->
  </div>
</template>

<script setup>
import { useRoute } from "vue-router"
import Footer from "@/components/Footer.vue"

const route = useRoute()
const showFooter = computed(() =>
  ["/home", "/about", "/projects","/press", "/contact"].includes(route.path)
)
</script>
