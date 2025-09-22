<template>
    <NavBar />
  <div class="press-page">
    <!-- Hero Heading -->
    <header class="press-header">
      <h1 class="press-title">THEY SAID IT BEST.</h1>
    </header>

    <!-- Loop through projects -->
    <section
      v-for="(project, pIdx) in pressData"
      :key="pIdx"
      class="press-project"
    >
      <h2 class="project-title">{{ project.project }}</h2>

      <!-- Category -->
      <div v-if="project.category" class="category-title">
        {{ project.category }}
      </div>

      <!-- Quotes & Laurels -->
      <div class="press-grid">
        <div
          v-for="(quote, qIdx) in project.quotes.filter(q => q && q.logo !== undefined)"
          :key="qIdx"
          class="press-card"
        >
          <!-- QUOTES -->
          <div v-if="quote.text" class="quote-wrapper">
            <blockquote class="quote-text">“{{ quote.text }}”</blockquote>
            <div class="logo-container">
              <span class="dash">—</span>
              <img
                :src="quote.logo"
                :alt="quote.source || 'Laurel Logo'"
                class="source-logo"
                :class="quote.class"
              />
            </div>
          </div>

          <!-- LAURELS (logo only, no text) -->
          <div v-else class="laurel-wrapper">
            <img :src="quote.logo" alt="Laurel logo" class="laurel-logo" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import pressData from "@/data/press.json"
</script>

<style scoped>
.press-page {
  background: black;
  color: white;
  padding: 4rem 2rem;
  font-family: "Helvetica Neue", Arial, sans-serif;
  overflow-x: hidden; /* ✅ no horizontal scroll */
}

.press-header {
  text-align: center;
  margin-bottom: 5rem;
}

.press-title {
  font-size: 3rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.press-project {
  margin-bottom: 6rem;
}

.project-title {
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 2rem;
  border-bottom: 1px solid #333;
  padding-bottom: 0.5rem;
}

.category-title {
  font-size: 1.25rem;
  font-weight: 400;
  font-style: italic;
  color: #bbb;
  margin-bottom: 2rem;
}

.press-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 5rem 4rem;
  justify-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.press-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 250px;
}

.quote-wrapper {
  max-width: 650px;
}

.quote-text {
  font-size: 1.6rem;
  font-weight: 300; /* thin font */
  line-height: 1.6;
  margin-bottom: 1.25rem;
  color: #f5f5f5;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.75rem;
}

.dash {
  font-size: 1.25rem;
  color: #aaa;
  margin-bottom: 0.25rem;
}

.source-logo {
  max-height: 80px;
  object-fit: contain;
}

/* Laurels */
.laurel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.laurel-logo {
  max-height: 150px;
  object-fit: contain;
}

/* Dark logos override */
.invert-dark-logo {
  filter: brightness(0) invert(1) contrast(100%);
}
</style>
