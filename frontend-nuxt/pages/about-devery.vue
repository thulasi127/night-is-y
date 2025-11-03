<template>
  <div class="about-team-page">
    <div class="navbar-fixed">
      <NavBar />
    </div>
    <div class="about-page-content">
      <div class="main-content-row">
      <div class="image-heading-container">
  <img class="image" :alt="bio.name + ' Headshot'" :src="bio.headshot" />
</div>

        <div class="main-text-block">
  <div class="names-row">
    <span class="devery-jacobs overline">DEVERY JACOBS</span>
    <NuxtLink to="/about-dw" class="dw-waterson overline">D.W. WATERSON</NuxtLink>
  </div>

  <!-- Removed duplicated name/pronouns -->
  <div class="devery-meta">
    <span class="span">{{ bio.role.toUpperCase() }}</span>
  </div>

  <!-- Two-column container: bio + works sidebar -->
  <div class="bio-container" ref="bioContainerRef">
  <!-- Left Column: Bio text and social icons -->
  <div class="bio-left">
    <div
      class="bio-text"
      v-html="bio.bio ? bio.bio.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>') : ''"
    ></div>

    <!-- Social icons underneath bio text -->
    <div class="social-icons-bio">
      <template v-for="link in orderedLinks" :key="link.type">
        <a
          v-if="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img :src="link.img" :alt="link.type + ' logo'" class="social-icon" />
        </a>
      </template>
    </div>
  </div>

  <!-- Right Column: Past Works Sidebar -->
  <div class="works-sidebar">
    <span class="sidebar-heading">PAST NOTABLE WORK:</span>
    <div class="works-list">
      <template v-for="(work, idx) in bio.notable_works" :key="work.title">
        <div><a href="#" @click.prevent="openVideo(work.url)">{{ work.title }}</a></div>
      </template>
    </div>
  </div>
</div>

</div>

      </div>
    </div>
    <transition name="fade">
   <div v-if="showVideo" class="video-modal" @click.self="closeVideo">
      <div class="video-wrapper">

        <iframe
          v-if="videoUrl"
          id="ytplayer"
          :src="videoUrl + '?autoplay=1&enablejsapi=1'"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></iframe>

        <div class="video-return" @click="closeVideo">
  <span>Return</span>
  <div class="return-line"></div>
</div>
      </div>
    </div>
  </transition>
  </div>
</template>

<script lang="ts" setup>
import NavBar from "../components/NavBar.vue";
import bioData from '~/data/bio.json';
import { ref, onMounted, watch } from "vue";

const showVideo = ref(false);
const videoUrl = ref("");

function openVideo(url: string) {
  // Convert YouTube watch link → embed link
  videoUrl.value = url.replace("watch?v=", "embed/").split("&")[0];
  showVideo.value = true;
}

function closeVideo() {
  videoUrl.value = "";
  showVideo.value = false;
}

// Load YouTube API and listen for video end
watch(showVideo, (val) => {
  if (val) {
    // Wait for iframe to mount
    setTimeout(() => {
      // Load YouTube API if not loaded
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
      window.onYouTubeIframeAPIReady = () => {
        const player = new window.YT.Player('ytplayer', {
          events: {
            'onStateChange': (event: any) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                closeVideo();
              }
            }
          }
        });
      };
      // If API already loaded
      if (window.YT && window.YT.Player) {
        const player = new window.YT.Player('ytplayer', {
          events: {
            'onStateChange': (event: any) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                closeVideo();
              }
            }
          }
        });
      }
    }, 500);
  }
});

const bio = bioData.devery_jacobs;

const bioContainerRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (bioContainerRef.value) {
    const rect = bioContainerRef.value.getBoundingClientRect();
    const containerCenterY = rect.top + rect.height / 2;
    const viewportCenterY = window.innerHeight / 2;
    const offset = containerCenterY - viewportCenterY;
    localStorage.setItem('bioContainerOffset', offset.toString());
  }
});


// Order icons manually (Instagram → IMDb)
const orderedLinks = bio.links.sort((a, b) => {
  const order = { instagram: 1, imdb: 2 };
  return (order[a.type] || 99) - (order[b.type] || 99);
});

useHead({
  title: 'About Devery | Night is Y',
  meta: [{ name: 'description', content: 'About Devery Jacobs.' }]
})
</script>


<style scoped>

/* --- Social Icons Under Bio --- */
.social-icons-bio {
  display: flex;
  align-items: center;
  gap: clamp(10px, 1vw, 14px);
  margin-top: clamp(4px, 1vw, 10px);
}

.social-icons-bio .social-icon {
  width: 36px;
  height: 36px;
  opacity: 0.85;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.social-icons-bio .social-icon:hover {
  opacity: 1;
  transform: scale(1.05);
}

.social-icons-overlay {
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: flex;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-heading-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: clamp(12px, 2vw, 20px);
  width: clamp(260px, 26vw, 380px);
  flex-shrink: 0;
  height: fit-content;
  margin: 0; /* ensure consistent top origin */
}

.image-heading-container .image {
  width: 100%;
  height: auto;
  max-height: 480px;
  object-fit: cover;
  border-radius: 4px;
}

.person-header {
  display: flex;
  align-items: center;
  gap: clamp(8px, 1vw, 10px);
}

.person-name {
  margin: 0;
  padding: 0;
  font-family: "anton", sans-serif;
  font-size: clamp(18px, 2.6vw, 28px);
  color: #fff;
  text-transform: uppercase;
  line-height: 1.1;
  letter-spacing: 0.5px;
}

.social-icons {
  display: flex;
  align-items: center;
  gap: clamp(6px, 0.8vw, 10px);
}

.social-icon {
  width: 36px;
  height: 36px;
  opacity: 0.85;
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.social-icon:hover {
  opacity: 1;
  transform: scale(1.05);
}

.about-team-page {
  background: #000;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  overflow: hidden !important; /* Disable scrolling */
  height: 100vh;
}

.navbar-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: #000;
}

.about-page-content {
  display: flex;
  flex-direction: column;
  justify-content: center;   /* vertically center */
  align-items: center;       /* horizontally center */
  min-height: 100vh;
  padding-top: 0;
  padding-bottom: 0;
  overflow: hidden;
}

.main-content-row {
  display: flex;
  align-items: flex-start; /* lock to top of row */
  justify-content: center;
  gap: clamp(28px, 6vw, 80px);
  padding: 0 clamp(18px, 6vw, 56px);
  width: 100%;
  margin: 0; /* ensures no inherited top gap */
}



/* Headshot + Heading */
.the-team-heading {
  margin: 0;
  padding: 0;
  font-family: "anton", sans-serif;
  font-size: clamp(28px, 4vw, 48px);
  line-height: 1.1;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Names Row */
.names-row {
  display: flex;
  gap: clamp(32px, 6vw, 48px); /* Increased gap */
  margin: clamp(8px, 2vw, 20px) 0;
  flex-wrap: wrap;
  margin-top: clamp(8px, 1vw, 12px);
}

.devery-meta{
  text-align: left
}

.devery-jacobs,
.dw-waterson {
  font-family: "anton", sans-serif;
  font-size: clamp(20px, 2.5vw, 28px);
  font-weight: 900;
  text-decoration: overline;
  text-transform: uppercase;
  line-height: 1.1;
}

.devery-jacobs.overline {
  text-decoration-color: #d90ec1ba;
}

.dw-waterson.overline {
  text-decoration-color: rgba(255,255,255,0.5);
  color: rgba(255,255,255,0.5);
  transition: color 0.3s, text-decoration-color 0.3s;
}
.dw-waterson.overline:hover {
  color: rgba(255,255,255,0.75);
  text-decoration-color: rgba(255,255,255,0.75);
}

/* Bio + Sidebar Container */
.main-text-block {
  max-width: clamp(360px, 50vw, 900px); /* increased so bio can use more horizontal space */ /* increased so bio can use more horizontal space */
  /* margin-top: clamp(40px, 6vw, 80px); */
  margin-top: 0;
}

.bio-container {
  display: grid;
  grid-template-columns: 3fr 1fr; /* bio on left, sidebar on right */
  gap: clamp(24px, 3vw, 40px);
  align-items: start;
  margin-top: clamp(12px, 2vw, 16px);
  max-width: 1300px;
 transition: margin-top 0.3s ease; 
}

.bio-left {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: clamp(16px, 2vw, 20px);
}

/* Bio Text */
.bio-text {
  font-family: "proxima-nova", sans-serif;
  font-size: clamp(12px, 1.5vw, 14px);
  line-height: 1.55;
  color: #e6e6e6;
  text-align: left;
  hyphens: auto;
}

/* --- Sidebar --- */
.works-sidebar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: clamp(10px, 1.5vw, 16px);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  width: 100%;
  max-width: 240px;
}

.sidebar-heading {
  font-size: clamp(11px, 1.5vw, 13px);
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 4px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 4px;
}


.works-list a {
  font-size: clamp(12px, 1.5vw, 14px);
  color: #e0e0e0;
  text-decoration: none;
  transition: color 0.2s ease;
}
.works-list a:hover {
  color: #d90ec1ba;
}
/* Social Icons */
.frame {
  display: flex;
  gap: clamp(8px, 1.5vw, 12px);
  margin-top: 8px;
  background: transparent;
  align-items: flex-end;      /* Align children to the bottom */
  height: 100%; 
}
.frame img {
  height: clamp(24px, 3vw, 32px);
  width: clamp(24px, 3vw, 32px);
  opacity: 0.85;
  transition: opacity 0.2s, transform 0.2s;
}
.frame img:hover { opacity: 1; transform: scale(1.05); }

/* Responsive Stacking for Mobile */
@media (max-width: 730px) {
  .bio-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .works-sidebar {
    width: 100%;
    text-align: center;
  }

  .social-icons-bio {
    justify-content: center;
  }
}

/* Responsive: stack on small screens */
@media (max-width: 730px) {
  .main-content-row {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 16px;
    padding: 0 clamp(12px, 4vw, 24px);
  }

  .bio-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    max-width: 100%;
  }

  .works-sidebar {
    width: 100%;
    margin-left: 0;
    text-align: center;
  }
}

/* --- Video Modal (Unified Scaling) --- */
.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
  padding: clamp(8px, 2vw, 16px);
}

.video-wrapper {
  position: relative;
  width: clamp(240px, 80vw, 960px);
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(6px, 2vw, 12px);
}

/* Iframe scales dynamically */
.video-wrapper iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: none;
  border-radius: 4px;
  max-height: 70vh;
}

/* Return Button */
.video-return {
  position: absolute;
  bottom: -48px;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  cursor: pointer;
  font-family: "proxima-nova", sans-serif;
  font-weight: 100;
  color: #fff;
  opacity: 0.7;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.video-return:hover {
  opacity: 1;
  transform: translateY(-2px);
}
.video-return span {
  font-size: 14px;
  letter-spacing: 1px;
}
.return-line {
  width: 48px;
  height: 1px;
  background: #fff;
  opacity: 0.5;
  transition: width 0.3s ease, opacity 0.2s ease;
}

.video-return:hover .return-line {
  width: 64px;
  opacity: 1;
}


/* Mobile: stack CTA below video if space is tight */
@media (max-width: 480px) {
  .video-wrapper {
    width: 95vw;
    gap: 8px;
  }

  .video-return {
    flex-direction: column;
    align-items: center;
    gap: 2px;
    margin-top: 6px;
  }

  .return-line {
    width: 28px;
  }

  .video-return:hover .return-line {
    width: 36px;
  }
}

@media (max-width: 1200px) {
  .video-return span { font-size: 13px; }
  .return-line { width: 44px; }
  .video-return:hover .return-line { width: 56px; }
}

@media (max-width: 992px) {
  .video-return span { font-size: 12px; }
  .return-line { width: 40px; }
  .video-return:hover .return-line { width: 52px; }
}

@media (max-width: 768px) {
  .video-return span { font-size: 11.5px; }
  .return-line { width: 36px; }
  .video-return:hover .return-line { width: 48px; }
}

@media (max-width: 480px) {
  .video-return { align-items: center; gap: 3px; margin-top: 6px; }
  .video-return span { font-size: 10.5px; letter-spacing: 0.5px; }
  .return-line { width: 28px; }
  .video-return:hover .return-line { width: 36px; }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from, .fade-leave-to { opacity: 0; }
.fade-enter-to, .fade-leave-from { opacity: 1; }

</style>
