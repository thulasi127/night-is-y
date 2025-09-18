<template>
  <div class="projects-page-menu">
    <NavBar />
    <div class="projects">PROJECTS</div>
    <div class="img-container">
      <img
        class="released-projects"
        alt="Released projects"
        :src="releasedProjectsCover"
      />
      <div class="img-overlay"></div>
    </div>
    <div class="film-series">FILM &amp; SERIES</div>
    <div class="img-container">
      <img
        class="in-development"
        alt="In development"
        :src="inDevelopmentProjectsCover"
      />
      <div class="img-overlay"></div>
    </div>
    <div class="img-container">
      <img class="img" alt="In development" :src="image" />
      <div class="img-overlay"></div>
    </div>
    <div class="music-videos">MUSIC VIDEOS</div>
    <div class="text-wrapper">IN DEVELOPMENT</div>
  </div>
</template>

<script setup>
import releasedProjectsCover from '../public/images/film-menu.png';
import inDevelopmentProjectsCover from '../public/images/music-menu.png';
import image from '../public/images/dev-menu.png';
</script>

<style scoped>
.projects-page-menu {
  background: #000;
  min-height: 100vh;
  width: 100vw;
  position: relative;
  overflow-x: hidden;
}

.projects {
  color: #ffffff;
  font-family: "Right Grotesk", Helvetica, Arial, sans-serif;
  font-size: 100px;
  font-weight: 900;
  position: absolute;
  top: 275px;
  left: 42px;
  letter-spacing: 0;
  line-height: 30px;
  width: 1195px;
}

.img-container {
  position: absolute;
  left: 0;
  width: 100%;
  height: 247px;
  /* Each image will be positioned individually */
}

.img-container:nth-of-type(2) { top: 339px; } /* released-projects */
.img-container:nth-of-type(4) { top: 586px; } /* in-development */
.img-container:nth-of-type(5) { top: 833px; } /* img */

.img-overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(30,30,30,0.25); /* Dark overlay by default */
  transition: background 0.3s;
  z-index: 2;
  pointer-events: none;
}

.img-container:hover .img-overlay {
  background: rgba(30,30,30,0); /* Remove overlay on hover */
}

.img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: box-shadow 0.3s;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}

.img-container:hover img {
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
}

.released-projects,
.in-development,
.img {
  /* Remove position and sizing from these classes, handled by .img-container img */
}

.film-series,
.music-videos,
.text-wrapper {
  z-index: 10; /* Ensure headings are above images and overlays */
  position: absolute;
  align-items: center;
  color: #ffffff;
  display: flex;
  font-family: "Neue Montreal", Helvetica, Arial, sans-serif;
  font-size: 36px;
  font-weight: 400;
  height: 96px;
  justify-content: center;
  right: 42px;
  text-align: right;
  width: 326px;
}

.film-series {
  top: 492px;
}

.music-videos {
  top: 737px;
}

.text-wrapper {
  top: 982px;
}

/* Responsive styles */
@media (max-width: 900px) {
  .projects {
    font-size: 4rem;
    top: 150px;
    left: 1rem;
    right: 1rem;
    width: auto;
    text-align: center;
  }

  .img-container {
    height: 150px;
  }
  .img-container:nth-of-type(2) { top: 220px; }
  .img-container:nth-of-type(4) { top: 420px; }
  .img-container:nth-of-type(5) { top: 620px; }

  .film-series,
  .music-videos,
  .text-wrapper {
    font-size: 1.5rem;
    height: auto;
    width: auto;
    left: 1rem;
    right: 1rem;
    justify-content: flex-start;
    text-align: left;
  }

  .film-series {
    top: 380px;
  }

  .music-videos {
    top: 580px;
  }

  .text-wrapper {
    top: 780px;
  }
}
</style>