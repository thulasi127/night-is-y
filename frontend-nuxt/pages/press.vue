<template>
  <NavBar />
  <div class="press-page">
    <!-- Hero Heading -->
    <header class="press-header">
  <div class="video-text-wrapper">
    <TheySaidItBestText text="THEY SAID IT BEST." videoSrc="/videos/cutout-final.mp4"/>
  </div>
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
          v-for="(quote, qIdx) in project.quotes"
          :key="qIdx"
          class="press-card"
        >
          <!-- QUOTES -->
          <div v-if="quote.text" class="quote-wrapper">
            <blockquote class="quote-text">“{{ quote.text }}”</blockquote>
            <div class="logo-container">
              <img
  :src="quote.logo"
  :alt="quote.source || 'Publication logo'"
  class="source-logo"
  :class="{ 'invert-dark-logo': quote.invertDarkLogo }"
/>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAsyncData, useHead } from '#imports'

import NavBar from '~/components/NavBar.vue'
import TheySaidItBestText from '~/components/PressText.vue'
import { sanityClient } from '~/utils/sanityClient'
import { PRESS_QUERY } from '~/lib/queries/press'

const { data: press, pending } = await useAsyncData('press', () =>
  sanityClient().fetch(PRESS_QUERY)
)

// Sanity already groups by project, so we pass it straight through
const groupedProjects = computed(() => press.value?.projects || [])

useHead({
  title: 'Press | Night Is Y',
  meta: [{ name: 'description', content: 'Press coverage for Night Is Y projects.' }]
})
</script>

<style scoped>
.press-page {
  background: black;
  color: white;
  padding: clamp(100px, 12vh, 160px) 2rem 4rem;
  font-family: "proxima-nova", sans-serif;
  overflow-x: hidden;
  box-sizing: border-box;
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
  max-width: 600px;
  margin: 0 auto;
}

.quote-text {
  font-size: 1.3rem;
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
  max-width: 300px;      /* Set a max width */
  max-height: 70px;      /* Already set, adjust as needed */
  width: 100%;           /* Ensures SVGs and PNGs fill the box */
  height: auto;
  object-fit: contain;   /* Keeps aspect ratio, fits inside box */
  display: block;
  margin: 0 auto;
}


/* Dark logos override */
.invert-dark-logo {
  filter: brightness(0) invert(1) contrast(100%);
}

/* ---------- Large Laptops (≤1440px) ---------- */
@media (max-width: 1440px) {
  .press-title {
    font-size: clamp(1.6rem, 2.5vw, 2rem);
  }

  .project-title {
    font-size: 1.8rem;
  }

  .quote-text {
    font-size: 1.4rem;
    line-height: 1.5;
  }

  .press-grid {
    gap: 4rem 3rem;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }

  .source-logo {
    max-height: 60px;
  }

  .quote-text {
  font-size: 1.1rem;
  line-height: 1.5;
}
}

/* ---------- Tablets & Small Laptops (≤1024px) ---------- */
@media (max-width: 1024px) {
  .press-title {
    font-size: clamp(1.4rem, 2.2vw, 1.8rem);
    margin-top: 100px;
  }

  .project-title {
    font-size: 1.6rem;
  }

  .quote-text {
    font-size: 1.3rem;
    line-height: 1.5;
  }

  .press-grid {
    gap: 3rem 2rem;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }

  .source-logo {
    max-height: 50px;
  }

  .quote-text {
  font-size: 1rem;
  line-height: 1.5;
}
}

/* ---------- Large Phones & Small Tablets (≤768px) ---------- */
@media (max-width: 768px) {
  .press-title {
    font-size: clamp(1.2rem, 2vw, 1.6rem);
  }

  .project-title {
    font-size: 1.4rem;
  }

  .quote-text {
    font-size: 1.1rem;
    line-height: 1.4;
  }

  .press-grid {
    gap: 2.5rem 2rem;
    grid-template-columns: 1fr; /* Single column on small screens */
  }

  .source-logo {
    max-height: 40px;
  }

  .quote-text {
  font-size: 0.9rem;
  line-height: 1.4;
}
}

/* ---------- Small Phones (≤430px) ---------- */
@media (max-width: 430px) {
  .press-title {
    font-size: clamp(1rem, 1.8vw, 1.4rem);
  }

  .project-title {
    font-size: 1.2rem;
  }

  .quote-text {
    font-size: 1rem;
    line-height: 1.4;
  }

  .press-grid {
    gap: 2rem 1.5rem;
  }

  .source-logo {
    max-height: 35px;
  }

  .quote-text {
  font-size: 0.85rem;
  line-height: 1.4;
}
}

.press-header {
  text-align: center;
  margin: 2rem auto 1.5rem; /* tighten spacing above and below */
  padding: 0; /* remove any padding that adds vertical height */
  max-width: 1400px;
  line-height: 1; /* prevent extra spacing from text line height */
}

 /* .video-text-wrapper {
  display: inline-block;
  transform: scale(0.32); 
  transform-origin: center;
  margin: 0;
  padding: 0;
}  */

.press-header :deep(.mask-svg text) {
  font-size: clamp(1.8rem, 2.9vw, 2.4rem) !important;
}

.press-header :deep(.mask-svg) {
  height: 120px !important; /* matches the height of 'Meet the Team' */
  overflow: hidden;
}


</style>

