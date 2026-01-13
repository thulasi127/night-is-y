<template>
  <div class="projects-page-menu">
    <NavBar />
    <div class="projects-content">
      <h1 class="projects-heading">PROJECTS</h1>
      <div class="project-rows">
<div class="project-rows">
  <div
    v-for="project in projects"
    :key="project.id"
    class="img-container clickable"
    @click="goTo(project.slug)"
  >
    <img :src="project.poster" :alt="project.title" />
    <div class="img-overlay"></div>
    <div class="row-label">{{ project.title }}</div>
  </div>
</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import client from '~/utils/sanityClient'

const router = useRouter()

const query = `*[_type == "projectMenu" && _id == "project-menu"][0]{
  filmSeries {
    poster { asset->{ url } }
  },
  musicVideos {
    poster { asset->{ url } }
  },
  inDevelopment {
    poster { asset->{ url } }
  }
}`

const { data } = await useAsyncData('project-menu', () =>
  client.fetch(query)
)

const projects = computed(() => [
  {
    id: 1,
    title: 'FILM & SERIES',
    slug: 'film-series',
    poster: data.value?.filmSeries?.poster?.asset?.url ?? '',
  },
  {
    id: 2,
    title: 'MUSIC VIDEOS',
    slug: 'music-videos',
    poster: data.value?.musicVideos?.poster?.asset?.url ?? '',
  },
  {
    id: 3,
    title: 'IN DEVELOPMENT',
    slug: 'development',
    poster: data.value?.inDevelopment?.poster?.asset?.url ?? '',
  },
])

function goTo(slug) {
  router.push(`/${slug}`)
}

useHead({
  title: 'Projects | Night is Y',
  meta: [{ name: 'description', content: 'Projects by Night is Y.' }],
})
</script>

<style scoped>

.projects-heading {
  font-size: clamp(40px, 5vw, 60px); /* slightly smaller globally */
  margin-bottom: 16px;
  line-height: 1;
  font-family: "anton", sans-serif;
  color: #fff;
  letter-spacing: -0.01em;
  display: flex;
  justify-content: flex-start;
  margin-left: calc(80px + 4vw); /* aligns slightly tighter with layout */
  transition: margin-left 0.3s ease;
}

.projects-page-menu {
  background: #000;
  min-height: 100vh;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Make NavBar fixed at the top */
NavBar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 1001;
}

/* Add top padding so "PROJECTS" header never overlaps NavBar */
.projects-content {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  justify-content: center;
  padding-top: 120px; /* ensures space under navbar */
}

.projects {
  color: #ffffff;
  font-family: "anton", sans-serif;
  font-size: 80px;
  font-weight: 300;
  margin-left: 42px;
  margin-bottom: 8px;
  letter-spacing: 0;
  line-height: 1;
  height: 110px;
  display: flex;
  align-items: flex-end;
  text-align: left;
}

.project-rows {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  flex: 1;
}

.img-container {
  position: relative;
  flex: 1 1 0;
  min-height: 180px;
  max-height: 400px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  overflow: hidden;
  transition: transform 0.4s ease;
  transform-origin: center;
  z-index: 0; /* keep baseline layer */
}

.img-container:hover {
  transform: scale(1.05);
  z-index: 5; /* bring above others when scaling */
}

.img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: brightness(0.9);
  transition: transform 0.4s ease, filter 0.3s, box-shadow 0.3s;
  position: relative;
  z-index: 1; /* keeps image below overlay + text */
}

.img-container:hover img {
  filter: brightness(1.05);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  transform: scale(1.1);
}

/* Default overlay for all rows */
.img-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.15);
  z-index: 2; /* sits above the image */
  pointer-events: none;
  transition: background 0.3s ease;
}
.img-container:hover .img-overlay {
  background: rgba(0, 0, 0, 0); /* Remove tint on hover */
}

/* Left → Right Fade */
.fade-left .img-overlay {
  background: linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
}

/* Right → Left Fade */
.fade-right .img-overlay {
  background: linear-gradient(to left, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
}

/* Hover removes the overlay completely */
.img-container:hover .img-overlay {
  background: rgba(30, 30, 30, 0);
}

.row-label {
  z-index: 3; /* ensures label is always visible */
transition: transform 0.4s ease, opacity 0.4s ease;
  position: absolute;
  right: calc(100px + 5vw); /* Equal to projects-heading's left margin */
  bottom: 32px;
  color: #fff;
  font-family: "proxima-nova", sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-shadow: 0 2px 8px rgba(0,0,0,0.7);
  padding: 8px 20px;
  border-radius: 4px;
  z-index: 3;
  pointer-events: none;
  max-width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
}

.img-container:hover .row-label {
  transform: translateY(-4px);
  opacity: 1;
}

.row-label,
.film-series,
.music-videos,
.text-wrapper {
  font-family: "proxima-nova", sans-serif;
  font-weight: 400;
  font-style: normal;
  letter-spacing: 0.05em;
}


@media (max-width: 900px) {
  .projects-content {
    padding-top: 80px;
  }
  .projects {
    font-size: 2.5rem;
    margin-left: 16px;
    margin-bottom: 8px;
    height: 60px;
  }
  .row-label {
    font-size: 1rem;
    right: 16px; /* Match projects-heading's left margin on mobile */
    bottom: 12px;
    padding: 4px 10px;
    max-width: 80%;
  }
  .img-container {
    min-height: 120px;
    max-height: 220px;
  }
}

.projects-heading {
  font-size: clamp(48px, 6vw, 72px);
  margin-bottom: 20px;
  line-height: 1;
  font-family: "anton", sans-serif;
  color: #fff;
  letter-spacing: -0.01em;
  display: flex;
  justify-content: flex-start; /* Default left alignment */
  margin-left: calc(100px + 5vw); /* Push it to align between logo + text */
  transition: margin-left 0.3s ease;
}

/* ---------- Large Laptops (≤1440px) ---------- */
@media (max-width: 1440px) {
  .projects-heading {
    font-size: clamp(36px, 4.5vw, 54px);
    margin-left: calc(60px + 4vw);
  }

  .row-label {
  font-size: 1.1rem;
  bottom: 24px;
  right: calc(60px + 4vw);
}

  .img-container {
    min-height: 160px;
    max-height: 320px;
  }
}

/* ---------- Tablets & Small Laptops (≤1024px) ---------- */
@media (max-width: 1024px) {
  .projects-heading {
    font-size: clamp(28px, 4vw, 42px);
    margin-left: calc(40px + 3vw);
  }

  .row-label {
  font-size: 1rem;
  bottom: 20px;
  right: calc(40px + 3vw);
}
  .img-container {
    min-height: 140px;
    max-height: 260px;
  }
}

/* ---------- Large Phones & Small Tablets (≤768px) ---------- */
@media (max-width: 768px) {
  .projects-heading {
    font-size: clamp(28px, 4vw, 40px);
    margin-left: 20px;
  }

  .row-label {
  font-size: 0.9rem;
  right: 20px;
  bottom: 16px;
}

  .img-container {
    min-height: 120px;
    max-height: 220px;
  }
}

/* ---------- Small Phones (≤430px) ---------- */
@media (max-width: 430px) {
  .projects-heading {
    font-size: clamp(24px, 3.5vw, 32px);
    margin-left: 16px;
  }

  .row-label {
  font-size: 0.8rem;
  right: 16px;
  bottom: 12px;
}

  .img-container {
    min-height: 100px;
    max-height: 180px;
  }
}


</style>