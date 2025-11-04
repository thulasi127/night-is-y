<template>
  <div class="about-team-page">
    <div class="navbar-fixed">
      <NavBar />
    </div>
    <div class="about-page-content">
      <div class="main-content-row">
  <!-- Left: Fixed headshot -->
  <div class="image-heading-container fixed-column">
    <img class="image" :alt="bio.name + ' Headshot'" :src="bio.headshot" />
  </div>

  <!-- Center: Fixed names + scrolling bio -->
  <div class="main-text-block fixed-column">
    <div class="names-row">
      <NuxtLink to="/about-devery" class="devery-jacobs overline">DEVERY JACOBS</NuxtLink>
      <span class="dw-waterson overline">D.W. WATERSON</span>
    </div>
    <div class="devery-meta">
      <span class="span">{{ bio.role.toUpperCase() }}</span>
    </div>

    <!-- Scrollable bio area -->
    <div class="bio-scroll">
      <div
  class="bio-container"
>
        <div class="bio-left">
          <div
            class="bio-text"
            v-html="bio.bio ? bio.bio.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>') : ''"
          ></div>

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

    </div>

    <!-- Video Modal -->
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
import { ref, watch, onMounted, computed } from "vue";

const storedOffset = ref<number | null>(null);
// const computedMarginTop = computed(() =>
//   storedOffset.value ? `calc(50vh - 50% + ${storedOffset.value}px)` : '0'
// );

onMounted(() => {
  // No offset logic needed anymore
});

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
    setTimeout(() => {
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
      window.onYouTubeIframeAPIReady = () => {
        const player = new window.YT.Player('ytplayer', {
          events: {
            'onStateChange': (event: any) => {
              if (event.data === window.YT.PlayerState.ENDED) closeVideo();
            }
          }
        });
      };
      if (window.YT && window.YT.Player) {
        const player = new window.YT.Player('ytplayer', {
          events: {
            'onStateChange': (event: any) => {
              if (event.data === window.YT.PlayerState.ENDED) closeVideo();
            }
          }
        });
      }
    }, 500);
  }
});

const bio = bioData.dw_waterson;

// Order icons manually (Instagram → IMDb)
const orderedLinks = bio.links.sort((a, b) => {
  const order = { instagram: 1, imdb: 2 };
  return (order[a.type] || 99) - (order[b.type] || 99);
});

useHead({
  title: 'About D.W. Waterson | Night is Y',
  meta: [{ name: 'description', content: 'About D.W. Waterson.' }]
});
</script>

<style scoped>


/* Social icons below bio */
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

/* --- Shared layout with about-devery --- */
.about-team-page {
  background: #000;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden !important;
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
  justify-content: center; /* center vertically on desktop */
  align-items: center;
  min-height: 100vh;
  padding-top: clamp(80px, 10vh, 140px); /* top offset below navbar */
  padding-bottom: clamp(40px, 8vh, 100px);
  box-sizing: border-box;
}

.main-content-row {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* keep image and names-row aligned at top */
  gap: clamp(28px, 6vw, 80px);
  padding: 0 clamp(24px, 6vw, 64px);
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
}

.image-heading-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: clamp(260px, 26vw, 380px);
  flex-shrink: 0;
}

.image-heading-container .image {
  width: 100%;
  height: clamp(400px, 45vh, 480px); /* scales smoothly with screen size */
  object-fit: cover;
  border-radius: 4px;
}

/* Names Row */
.names-row {
  display: flex;
  gap: clamp(32px, 6vw, 48px); /* Increased gap */
  margin: clamp(8px, 2vw, 20px) 0;
  flex-wrap: wrap;
  margin-top: clamp(8px, 1vw, 12px);
}

.devery-meta {
  text-align: left;
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
  text-decoration-color: rgba(255,255,255,0.5);
  color: rgba(255,255,255,0.5);
  transition: color 0.3s, text-decoration-color 0.3s;
}
.devery-jacobs.overline:hover {
  color: rgba(255,255,255,0.75);
  text-decoration-color: rgba(255,255,255,0.75);
}

.dw-waterson.overline {
  text-decoration-color: #d90ec1ba;
}

/* Bio + Sidebar Container */
.main-text-block {
  max-width: clamp(360px, 50vw, 900px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.bio-container {
  display: grid;
  grid-template-columns: 3fr 1fr;
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
  min-height: clamp(440px, 52vh, 540px); /* sets a consistent visual height */
  max-height: clamp(540px, 62vh, 620px);
  overflow: hidden;
}


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
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 6px;
  width: 100%;
  max-width: 240px;
}

.sidebar-heading {
  font-size: clamp(11px, 1.5vw, 13px);
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 4px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
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

@media (max-width: 1024px) {
  .about-page-content {
    justify-content: flex-start; /* prevents over-centering on short screens */
    padding-top: clamp(60px, 8vh, 100px);
  }
}

@media (max-width: 730px) {
  .main-content-row {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 24px;
    padding: 0 clamp(12px, 4vw, 24px);
  }

  .image-heading-container .image {
    height: auto;
    max-height: 400px;
  }

  .about-page-content {
    justify-content: flex-start;
    padding-top: clamp(80px, 12vh, 120px);
  }
}

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
</style>
