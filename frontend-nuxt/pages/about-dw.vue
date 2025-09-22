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
              {{ bio.title }} ({{ bio.pronouns }})
            </span>
            <br>
            <span class="span">
              {{ bio.role }}
            </span>
          </div>
          <span class="text-wrapper-4" v-html="bio.bio ? bio.bio.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>') : ''"></span>
          <br /><br />
          <span class="text-wrapper-5">PAST NOTABLE WORK:</span>
          <div class="notable-works-horizontal">
            <template v-for="(work, idx) in bio.notable_works" :key="work.title">
              <a href="#" @click.prevent="openVideo(work.url)">
                {{ work.title }}
              </a>
              <span v-if="idx < bio.notable_works.length - 1" class="dot">•</span>
            </template>
          </div>
          <div class="frame">
            <template v-for="link in bio.links" :key="link.type">
              <a :href="link.url" target="_blank" rel="noopener noreferrer">
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
                  style="height:48px;width:48px;"
                />
              </a>
            </template>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <NuxtPage />
    </transition>

    <transition name="fade">
    <div v-if="showVideo" class="video-modal">
      <div class="video-wrapper">
        <button class="close-modal-button" @click="closeVideo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
        <iframe
          v-if="videoUrl"
          id="ytplayer"
          :src="videoUrl + '?autoplay=1&enablejsapi=1'"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></iframe>
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
  max-width: 600px; /* reduced from 800px */
  margin-top: 160px; /* reduced from 240px */
}

.names-row {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  width: 100%;
  white-space: nowrap;
  gap: 32px;
  margin-bottom: 12px;
}

.devery-jacobs,
.devery-jacobs.overline {
  font-family: "anton", sans-serif;
  /* font-size: 48px; */
  font-weight: 300;
  font-size: clamp(28px, 3vw, 36px); /* reduced from 48px */
  line-height: 1.2;
  /* line-height: 45px; */
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-transform: none;
  text-decoration: overline;
  text-decoration-thickness: 3px;
  text-decoration-color: rgba(255, 255, 255, 0.5); /* switched to faded white */
  transition: color 0.2s;
}

.devery-jacobs:hover,
.devery-jacobs.overline:hover {
  color: rgba(255, 255, 255, 0.75);
  text-decoration-color: rgba(255, 255, 255, 0.75);
}

.dw-waterson,
.dw-waterson.overline {
  font-family: "anton", sans-serif;
  /* font-size: 48px; */
  font-weight: 300;
  font-size: clamp(28px, 3vw, 36px); /* reduced from 48px */
  line-height: 1.2;
  color: white;
  letter-spacing: 0;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-transform: uppercase;
  text-decoration: overline;
  text-decoration-thickness: 3px;
  text-decoration-color: #d90ec1ba; /* switched to magenta */
}

.devery-meta, .span {
  font-family: "anton", sans-serif;
  font-size: clamp(16px, 1.8vw, 20px);
  margin-bottom: 20px;
  margin-top: 12px;
}

.text-wrapper-4 {
  font-family: "proxima-nova", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: clamp(16px, 1.8vw, 18px);
  line-height: 1.5;
  letter-spacing: 0px;
  color: #fff;
  text-transform: none;
}

.text-wrapper-5 {
  font-family: "proxima-nova", sans-serif;
  font-size: clamp(12px, 1.2vw, 14px);
  margin-top: 16px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: 0px;
  color: #fff;
  text-transform: uppercase;
}

.notable-works-list {
  margin-top: 8px;
  margin-bottom: 8px;
  padding-left: 0;
  list-style: none;
}

.notable-works-list li {
  margin-bottom: 6px;
}

.notable-works-list a {
  font-family: "anton", sans-serif;
  color: #d90ec1ba;
  font-weight: 300;
  text-decoration: underline;
  font-size: 16px;
  transition: color 0.2s;
}

.notable-works-list a:hover {
  color: #fff;
}

.notable-works-horizontal {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  margin-bottom: 8px;
}

.notable-works-horizontal a {
  font-family: "proxima-nova", sans-serif;
  font-weight: 400;
  color: #fff;
  text-decoration: underline;
  text-transform: none;
  letter-spacing: 0px;
  line-height: 30px;
  transition: color 0.2s;
  white-space: nowrap;
  font-size: clamp(12px, 1.2vw, 14px);
}

.notable-works-horizontal a:hover {
  color: #d90ec1ba;
}

.notable-works-horizontal .dot {
  color: #fff;
  font-size: 10px;
  margin: 0 6px;
  user-select: none;
  font-weight: bold;
  line-height: 1;
}

.frame {
  height: 99px;
  display: flex;
  align-items: center;
  width: auto;
  gap: 16px;
  margin-top: 20px;
  background: transparent;
}

.imdb-logo {
  aspect-ratio: 1;
  height: 36px !important;
  width: 36px !important;
  object-fit: cover;
}

.instagram-instance,
.youtube-instance {
  height: 36px !important;
  width: 36px !important;
  position: static !important;
}

.imdb-logo,
.instagram-instance,
.youtube-instance {
  height: 36px !important;
  width: 36px !important;
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

.close-modal-button {
  position: absolute;
  top: -48px;
  right: -48px;
  z-index: 5;
  background: none;
  border: none;
  color: #fff;
  width: 28px;      /* reduced from 40px */
  height: 28px;     /* reduced from 40px */
  font-size: 20px;  /* reduced from 28px */
  line-height: 1;
  cursor: pointer;
  border-radius: 999px;
  transition: transform .15s, opacity .15s, background-color .15s;
}
.close-modal-button:hover {
  transform: scale(1.06);
  opacity: .85;
  background-color: transparent;
}
.close-modal-button:hover svg {
  filter: brightness(0.7);
  transition: filter 0.15s;
}
</style>
