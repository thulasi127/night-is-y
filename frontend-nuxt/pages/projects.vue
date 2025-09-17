<template>
  <div class="projects-page-menu" data-model-id="174:83">
    <NavBar />
    <div class="main-content">
      <div class="projects-header">
        <h1 class="projects-title">PROJECTS</h1>
      </div>
      
      <div class="projects-grid">
        <div class="project-section">
          <div class="image-placeholder released-projects">
            <div class="upload-indicator">
              <span class="upload-text">Upload Image</span>
            </div>
          </div>
          <div class="overlay-text film-series">FILM &amp; SERIES</div>
        </div>
        
        <div class="project-section">
          <div class="image-placeholder in-development">
            <div class="upload-indicator">
              <span class="upload-text">Upload Image</span>
            </div>
          </div>
          <div class="overlay-text music-videos">MUSIC VIDEOS</div>
        </div>
        
        <div class="project-section">
          <div class="image-placeholder final-section">
            <div class="upload-indicator">
              <span class="upload-text">Upload Image</span>
            </div>
          </div>
          <div class="overlay-text text-wrapper">IN DEVELOPMENT</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "../components/NavBar.vue";

export default defineComponent({
  name: "ProjectsPageMenu",
  components: {
    NavBar,
  },
});
</script>

<style>
.projects-page-menu {
  background-color: #000000;
  min-height: 100vh;
  width: 100vw;
  position: relative;
}

.main-content {
  padding-top: 120px;
  height: 100vh;
  max-width: 1728px;
  margin: 0 auto;
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.projects-header {
  padding: 2rem 0 1rem 0;
  flex-shrink: 0;
}

.projects-title {
  font-family: "Right Grotesk", Helvetica, Arial, sans-serif;
  font-size: 100px;
  font-weight: 900;
  line-height: 30px;
  color: white;
  letter-spacing: 0;
  word-wrap: break-word;
  text-transform: uppercase;
  text-align: left;
}

.projects-grid {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  min-height: 0;
  padding-bottom: 2rem;
}

.project-section {
  position: relative;
  flex: 1;
  min-height: 0;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(255, 255, 255, 0.1);
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;
}

.image-placeholder:hover {
  border-color: rgba(255, 255, 255, 0.2);
  background: linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%);
}

.upload-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.image-placeholder:hover .upload-indicator {
  opacity: 0.8;
}

.upload-text {
  color: #888;
  font-family: "Neue Montreal-Regular", Helvetica;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.5px;
}

.overlay-text {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  color: #ffffff;
  font-family: "Neue Montreal-Regular", Helvetica;
  font-size: clamp(1.1rem, 2.5vw, 1.8rem);
  font-weight: 500;
  letter-spacing: 0.1em;
  line-height: 1.2;
  text-align: right;
  z-index: 10;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.project-section:hover .overlay-text {
  color: #f0f0f0;
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.9);
}

/* Mobile specific adjustments */
@media (max-width: 768px) {
  .main-content {
    padding-top: 80px;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .projects-header {
    padding: 1rem 0 0.8rem 0;
  }
  
  .projects-grid {
    gap: 1rem;
    padding-bottom: 1rem;
  }
  
  .overlay-text {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
    text-align: left;
    font-size: clamp(1rem, 4vw, 1.4rem);
  }
  
  .upload-text {
    font-size: 0.9rem;
  }
  
  .project-section {
    border-radius: 8px;
  }
}

/* Tablet adjustments */
@media (min-width: 769px) and (max-width: 1024px) {
  .main-content {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  
  .projects-grid {
    gap: 1rem;
  }
}

/* Large screen adjustments */
@media (min-width: 1025px) {
  .projects-grid {
    gap: 1.5rem;
  }
  
  .overlay-text {
    font-size: clamp(1.2rem, 2vw, 2rem);
  }
}
</style>
