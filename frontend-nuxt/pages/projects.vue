<template>
  <div class="projects-page-menu">
    <NavBar />
    <div class="projects-content">
      <div class="projects">PROJECTS</div>
      <div class="project-rows">
        <div class="img-container clickable" @click="goToFilmSeries">
          <img
            class="released-projects"
            alt="Released projects"
            src="/Image/project-covers/film-series/film-cover-3.jpg"
          />
          <div class="img-overlay"></div>
          <div class="row-label film-series">FILM &amp; SERIES</div>
        </div>
        <div class="img-container clickable" @click="goToMusicVideos">
        <img
          class="in-development"
          alt="Music Videos"
          src="/Image/project-covers/music-videos/music-video-cover-1.jpg"
        />
        <div class="img-overlay"></div>
        <div class="row-label music-videos">MUSIC VIDEOS</div>
      </div>
        <div class="img-container clickable" @click="goToDevelopment">
          <img
            class="img"
            alt="In development"
            src="/Image/project-covers/in-dev/in-dev-cover-1.jpg"
          />
          <div class="img-overlay"></div>
          <div class="row-label text-wrapper">IN DEVELOPMENT</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

useHead({
  title: 'Projects | NIGHT is Y',
  meta: [{ name: 'description', content: 'Projects by NIGHT is Y.' }]
})

const router = useRouter();
const goToFilmSeries = () => {
  router.push('/film-series');
};

const goToDevelopment = () => {
  router.push('/development');
};

const goToMusicVideos = () => router.push('/music-videos');

</script>

<style scoped>
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
  min-height: 180px;   /* Increased thickness */
  max-height: 400px;   /* Increased maximum thickness */
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  overflow: hidden;
}

.img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: brightness(0.7);
  transition: filter 0.3s, box-shadow 0.3s;
}

.img-container:hover img {
  filter: brightness(1);
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
}

.img-overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(30,30,30,0.25);
  transition: background 0.3s;
  z-index: 2;
  pointer-events: none;
}

.img-container:hover .img-overlay {
  background: rgba(30,30,30,0);
}

.row-label {
  position: absolute;
  right: 42px;
  bottom: 32px;
  color: #fff;
  font-family: "proxima-nova", sans-serif;
  font-size: 1.5rem; /* reduced from 2rem */
  font-weight: 400;
  letter-spacing: 0.05em;
  text-shadow: 0 2px 8px rgba(0,0,0,0.7);
  padding: 8px 20px;
  border-radius: 4px;
  z-index: 3;
  pointer-events: none;
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
    right: 12px;
    bottom: 12px;
    padding: 4px 10px;
  }
  .img-container {
    min-height: 120px;
    max-height: 220px;
  }
}
</style>