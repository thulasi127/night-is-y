<template>
  <div class="projects-page-menu">
    <NavBar />
    <div class="main-content">
      <div class="projects-header">
        <h1 class="projects-title">PROJECTS</h1>
      </div>
      <div class="projects-grid">
        <div v-for="project in projects" :key="project.title" class="project-card">
          <img :src="project.image" :alt="project.title" class="project-img" />
          <div class="project-overlay">
            <h2 class="project-name">{{ project.title }}</h2>
            <p class="project-desc">{{ project.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const projects = [
  {
    title: "Film & Series",
    image: "/images/film-menu.png",
    desc: "Award-winning films and original series.",
  },
  {
    title: "Music Videos",
    image: "/images/music-menu.png",
    desc: "Cinematic music videos for bold artists.",
  },
  {
    title: "In Development",
    image: "/images/dev-menu.png",
    desc: "Upcoming projects and creative concepts.",
  },
];
</script>

<style scoped>
.projects-page-menu {
  background: #000;
  min-height: 100vh;
  width: 100vw;
  padding-bottom: 3rem; /* Ensures space at the bottom */
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  border-bottom: 4px solid #222; /* Visible bottom boundary */
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 6rem;
  padding-bottom: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 3rem - 4px); /* Ensures content fits above bottom boundary */
  box-sizing: border-box;
  pointer-events: auto;
}

.projects-header {
  margin-bottom: 2.5rem;
}

.projects-title {
  margin: 0;
  font-family: "Right Grotesk", Helvetica, Arial, sans-serif;
  font-size: 80px;
  font-weight: 900;
  line-height: 1;
  color: white;
  letter-spacing: 0;
  text-transform: uppercase;
  text-align: left;
}

.projects-grid {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  width: 100%;
}

.project-card {
  position: relative;
  width: 100%;
  aspect-ratio: 16/6;
  border-radius: 16px;
  overflow: hidden;
  background: #111;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  transition: transform 0.3s cubic-bezier(.4,0,.2,1), box-shadow 0.3s cubic-bezier(.4,0,.2,1);
  cursor: pointer;
  display: flex;
  align-items: flex-end;
}

.project-card:hover {
  transform: scale(1.02);
  box-shadow: 0 16px 48px rgba(0,0,0,0.3);
}

.project-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: filter 0.3s cubic-bezier(.4,0,.2,1);
}

.project-card:hover .project-img {
  filter: brightness(0.7) blur(1px);
}

.project-overlay {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 2rem 2.5rem;
  background: linear-gradient(0deg, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.0) 100%);
  color: #fff;
  transition: background 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.project-name {
  font-family: "Right Grotesk", Helvetica, Arial, sans-serif;
  font-size: 2.2rem;
  font-weight: 900;
  margin: 0 0 0.5rem 0;
  letter-spacing: 0;
  text-transform: uppercase;
}

.project-desc {
  font-family: "Neue Montreal", Helvetica, Arial, sans-serif;
  font-size: 1.15rem;
  font-weight: 400;
  margin: 0;
  opacity: 0.85;
}

@media (max-width: 900px) {
  .main-content {
    padding-top: 4rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .projects-title {
    font-size: 2.5rem;
  }
  .project-card {
    aspect-ratio: 16/9;
    min-height: 180px;
  }
  .project-overlay {
    padding: 1rem;
  }
}
</style>