<template>
  <div class="about-team-page">
    <div class="navbar-fixed">
      <NavBar />
    </div>
    <div class="about-page-devery-content">
      <div class="main-content-row">
        <div class="image-heading-container">
          <h1 class="the-team-heading">THE TEAM</h1>
          <img
            class="image"
            :alt="bio.name + ' Headshot'"
            :src="bio.headshot"
          />
        </div>
        <div class="main-text-block">
          <div class="names-row">
            <NuxtLink to="/about-devery" class="devery-jacobs overline">DEVERY JACOBS</NuxtLink>
            <span class="dw-waterson overline">D.W. WATERSON</span>
          </div>
          <div class="devery-meta">
            <span class="span">
              {{ bio.name.toUpperCase() }} ({{ bio.pronouns.toUpperCase() }})
            </span>
            <br>
            <span class="span">
              {{ bio.role.toUpperCase() }}
            </span>
          </div>

          <div class="bio-container">
            <!-- Left: Bio text -->
            <div class="bio-text" v-html="bio.bio ? bio.bio.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>') : ''"></div>

            <!-- Right: Past works sidebar -->
            <div class="works-sidebar">
              <span class="sidebar-heading">PAST NOTABLE WORK:</span>
              <div class="works-list">
                <template v-for="(work, idx) in bio.notable_works" :key="work.title">
                  <a href="#" @click.prevent="openVideo(work.url)">{{ work.title }}</a>
                </template>
              </div>
              <div class="frame">
                <template v-for="link in bio.links" :key="link.type">
                  <a v-if="link.url" :href="link.url" target="_blank" rel="noopener noreferrer">
                    <img
                      v-if="link.type === 'imdb'"
                      class="imdb-logo"
                      :alt="link.type + ' logo'"
                      :src="link.img"
                    />
                    <img
                      v-else
                      :class="link.type + '-instance'"
                      :alt="link.type + ' logo'"
                      :src="link.img"
                      style="height:36px;width:36px;"
                    />
                  </a>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <NuxtPage />
    </transition>

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

const bio = bioData.dw_waterson;
</script>

<style scoped>
/* --- Base page (from Layout 2) --- */
.about-team-page {
  background: #000;
  height: 100%; /* changed from min-height: 100vh */
  width: 100vw;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  position: relative;
}

.navbar-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 1000;
  background: #000;
}

.about-page-devery-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 64px; /* Increased from 48px */
  width: 100%;
}

/* Remove .header-row styles */


.main-content-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  justify-content: center;
  margin-left: 0;
}

/* New container for heading and image */
.image-heading-container {
  width: 480px; /* reduced from 626px */
  margin-right: 40px;
}

.the-team-heading {
  font-size: clamp(48px, 6vw, 72px); /* smaller, responsive */
  margin-top: 100px; /* reduced from 144px */
  margin-bottom: 20px;
  line-height: 1;
}

.image {
  width: 480px;
  height: 540px;
  object-fit: cover;
}

.image.loaded {
  opacity: 1;
}

.main-text-block {
  max-width: 600px;
  margin-top: 120px;
}

.names-row {
  display: flex;
  gap: 32px;
  margin-bottom: 10px;
  text-align: left;
}

.devery-jacobs,
.devery-jacobs.overline {
  font-family: "anton", sans-serif;
  font-size: clamp(28px, 3vw, 36px);
  font-weight: 900;
  text-decoration: overline;
  text-decoration-thickness: 3px;
  line-height: 1.1;
  color: rgba(255,255,255,0.5);
  text-transform: uppercase;
  text-decoration-color: rgba(255,255,255,0.5);
  transition: color 0.3s ease, text-decoration-color 0.3s ease;
  cursor: pointer;
}
.devery-jacobs:hover,
.devery-jacobs.overline:hover {
  color: rgba(255, 255, 255, 0.75);
  text-decoration-color: rgba(255, 255, 255, 0.75);
}

.dw-waterson,
.dw-waterson.overline {
  font-family: "anton", sans-serif;
  font-size: clamp(28px, 3vw, 36px);
  font-weight: 900;
  text-decoration: overline;
  text-decoration-thickness: 3px;
  text-decoration-color: #d90ec1ba; /* switched to magenta */;
  line-height: 1.1;
}

.devery-meta, .span {
  font-family: "proxima-nova", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: clamp(15px, 1.6vw, 18px);
  margin-bottom: 14px;
  margin-top: 8px;
  letter-spacing: 0.5px;
  color: #fff;
  text-transform: uppercase;
  text-align: left;
}

.bio-container {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 32px;
  margin-top: 12px;
  align-items: flex-start;
  max-width: 900px;
}

.bio-text {
  font-family: "proxima-nova", sans-serif;
  font-size: 14px;
  line-height: 1.4;
  color: #e6e6e6;
  text-align: left;
  column-count: 2;
  column-gap: 32px;
  margin-bottom: 20px;
  hyphens: auto;
  -webkit-hyphens: auto;
  -ms-hyphens: auto;
}
.bio-text p {
  margin-bottom: 0.5em;
}

/* --- Past Notable Work Sidebar --- */
.works-sidebar {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.03); /* subtle tinted background */
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1); /* faint border for structure */
  max-width: 280px;
}

.sidebar-heading {
  font-size: 13px;
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 4px;
  letter-spacing: 1px;
  opacity: 0.9;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 6px;
}

.works-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.works-list a {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  color: #e0e0e0;
  text-decoration: none;
  transition: color 0.2s ease;
}

.works-list a:hover {
  color: #d90ec1ba;          /* Magenta hover to match name-row */
}

/* Keep dots white and subtle */
.works-list .dot {
  color: #fff;
  margin: 0 6px;
  user-select: none;
  font-weight: bold;
}

.frame {
  display: flex;
  gap: 14px;
  margin-top: 10px;
  background: transparent;
}
.frame img {
  height: 32px;
  width: 32px;
  opacity: 0.85;
  transition: opacity 0.2s, transform 0.2s;
  filter: drop-shadow(0 0 2px #fff2); /* subtle glow for visibility */
}
.frame img:hover {
  opacity: 1;
  transform: scale(1.05);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1); /* slower fade */
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}

.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7); /* more transparent */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.video-wrapper {
  position: relative;
  width: 90vw;      /* increased from 100vw for padding */
  height: 90vh;     /* increased from 100vh for padding */
  max-width: 1200px;
  max-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-wrapper iframe {
  width: 90vw;      /* increased from 100vw */
  height: 90vh;     /* increased from 100vh */
  max-width: 1200px;
  max-height: 700px;
  border: none;
}

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
  font-style: normal;
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

/* ------------------------------
   1) Scaled-down Desktop Layout
   ------------------------------ */
@media (max-width: 1024px) and (min-width: 431px) {
  .main-content-row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 24px;
    padding: 0 24px;
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
  }

  .image-heading-container {
    max-width: 360px;
    text-align: left;
    margin: 0;
  }

  .image-heading-container .image {
    width: 100%;
    height: auto;
  }

  .main-text-block {
    max-width: 540px;
    text-align: left;
  }

  .names-row {
    justify-content: flex-start;
    gap: 16px;
    margin: 8px 0;
  }

  .bio-text {
    text-align: left;
    max-width: 540px;
    column-count: 2;
    column-gap: 24px;
  }

  .works-sidebar {
    max-width: 280px;
    margin: 16px 0 0;
    padding: 12px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
  }
}

/* ------------------------------
   2) Fully Centered Mobile Layout
   ------------------------------ */
@media (max-width: 430px) {
  
  .main-content-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 16px;
    padding: 0 16px;
    width: 100%;
  }

  .image-heading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    width: 100%;
    text-align: center;
  }

  .image-heading-container .image {
    width: 80%;
    max-width: 280px;
    height: auto;
    margin: 0 auto;
  }

  .names-row {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 8px 0;
    width: 100%;
    text-align: center;
  }

  .names-row span,
  .names-row a {
    font-size: clamp(14px, 4vw, 18px);
    white-space: nowrap;
    text-align: center;
  }

  .devery-meta {
    text-align: center;
    margin-bottom: 12px;
  }

  .bio-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
    gap: 12px;
  }

  .bio-text {
    text-align: center;
    max-width: 360px;
    line-height: 1.4;
    margin: 0 auto;
    column-count: 1;
  }

  .works-sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 16px auto 0;
    text-align: center;
    width: 100%;
    max-width: 360px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
  }

  .works-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
    width: 100%;
  }

  .frame {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 10px;
  }

  .video-wrapper {
    max-width: 100%;
    aspect-ratio: 16 / 9;
    padding: 0;
  }

  .video-wrapper iframe {
    width: 100%;
    height: 100%;
  }
}


</style>
