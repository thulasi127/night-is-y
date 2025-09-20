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
            src="/Image/project-covers/film-series/film-cover-1.jpg"
          />
          <div class="img-overlay"></div>
          <div class="row-label film-series">FILM &amp; SERIES</div>
        </div>
        <div class="img-container">
          <img
            class="in-development"
            alt="Music Videos"
            src="/Image/project-covers/music-videos/music-video-cover-1.jpg"
          />
          <div class="img-overlay"></div>
          <div class="row-label music-videos">MUSIC VIDEOS</div>
        </div>
        <div class="img-container">
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
const router = useRouter();
const goToFilmSeries = () => {
  router.push('/film-series');
};

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
  justify-content: center; /* Center everything vertically */
}

.projects-content {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  justify-content: center; /* Center group vertically */
}

.projects {
  color: #ffffff;
  font-family: "Right Grotesk-SpatialBlack", Helvetica;
  font-size: 80px;
  font-weight: 900;
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
  font-family: "Neue Montreal-Regular", Helvetica;
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-shadow: 0 2px 8px rgba(0,0,0,0.7);
  padding: 8px 20px;
  border-radius: 4px;
  z-index: 3;
  pointer-events: none;
}

@media (max-width: 900px) {
  .projects-content {
    justify-content: center;
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