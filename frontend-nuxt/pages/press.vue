<template>
  <NavBar />
  <div class="press-page">
    <!-- Hero Heading -->
    <header class="press-header">
      <h1 class="press-title">THEY SAID IT BEST.</h1>
    </header>

    <!-- Group by project, ignore category -->
    <section
      v-for="(project, pIdx) in groupedProjects"
      :key="pIdx"
      class="press-project"
    >
      <h2 class="project-title">{{ project.project }}</h2>
      <div class="press-grid">
        <div
          v-for="(quote, qIdx) in project.allQuotes"
          :key="qIdx"
          class="press-card"
        >
          <!-- QUOTES -->
          <div v-if="quote.text" class="quote-wrapper">
            <blockquote class="quote-text">“{{ quote.text }}”</blockquote>
            <div class="logo-container">
              <img
                :src="quote.logo"
                :alt="quote.source || 'Laurel Logo'"
                class="source-logo"
                :class="quote.class"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import pressDataRaw from "@/data/press.json"
import { useHead } from '#imports'

// Group all quotes by project, ignoring category
const groupedProjects = [];
const projectMap = new Map();

for (const entry of pressDataRaw) {
  if (!projectMap.has(entry.project)) {
    projectMap.set(entry.project, { project: entry.project, allQuotes: [] });
  }
  projectMap.get(entry.project).allQuotes.push(...(entry.quotes || []));
}

groupedProjects.push(...projectMap.values());

// Set the browser tab title and meta description
useHead({
  title: 'Press | Night Is Y',
  meta: [{ name: 'description', content: 'Press coverage for Night Is Y projects.' }]
});
</script>

<style scoped>
.press-page {
  background: black;
  color: white;
  padding: 4rem 2rem;
  font-family: "proxima-nova", sans-serif;
  overflow-x: hidden; 
}

.press-header {
  text-align: center;
  margin: 6rem 0 5rem; 
}

.press-title {
  font-family: "anton", sans-serif;
    font-weight: 300;
    font-size: clamp(1.8rem, 2.9vw, 2.4rem);
    line-height: 1.1;
    text-transform: uppercase;
    text-align: center;
  letter-spacing: 2px;
  background: linear-gradient(
    270deg,
    #6808AB,
    #D90EC1,
    #83A780,
    #ffffff,
    #6808AB
  );
  background-size: 600% 600%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientMove 6s ease infinite; /* slowed down for headline effect */
}

@media (max-width: 1024px) {
            .press-title {
                margin-top: 120px;
                /* More space on smaller screens to prevent overlap */
            }
        }

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
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
  font-family: "proxima-nova", sans-serif;
  font-weight: 100;      /* Thin */
  font-style: italic;    /* Italics */
  line-height: 1.6;
  margin-bottom: 1.25rem;
  color: #f5f5f5;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.source-logo {
  max-height: 70px;
  width: auto;
  object-fit: contain;
}


/* Dark logos override */
.invert-dark-logo {
  filter: brightness(0) invert(1) contrast(100%);
}
</style>

