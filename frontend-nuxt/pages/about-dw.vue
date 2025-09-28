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
/* --- Base Layout --- */
.about-team-page {
  background: #000;
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
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
  padding-top: 64px;
  width: 100%;
}

.main-content-row {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin-left: 0;
}

/* --- Headshot + Heading --- */
.image-heading-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
  width: 480px;
  margin-right: 40px;
}

.the-team-heading {
  margin-top: 100px;
  margin-bottom: 20px;
  font-size: clamp(32px, 5vw, 72px);
  line-height: 1.1;
}

.image-heading-container .image {
  display: block;
  width: 480px;
  height: 540px;
  object-fit: cover;
  border-radius: 4px;
}

/* --- Names Row --- */
.names-row {
  display: flex;
  gap: 32px;
  margin: 20px 0;
  text-align: left;
  flex-wrap: wrap;
  justify-content: flex-start;
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


.devery-jacobs {
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  transition: color 0.3s ease, text-decoration-color 0.3s ease;
}

.devery-jacobs:hover {
  color: rgba(255, 255, 255, 0.75);
  text-decoration-color: rgba(255, 255, 255, 0.75);
}

/* --- Bio Section --- */
.main-text-block {
  max-width: 600px;
  margin-top: 120px;
}

.bio-container {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 32px;
  margin-top: 12px;
  max-width: 900px;
  align-items: flex-start;
}

.bio-text {
  font-family: "proxima-nova", sans-serif;
  font-size: 14px;
  line-height: 1.4;
  color: #e6e6e6;
  column-count: 2;
  column-gap: 32px;
  hyphens: auto;
}

/* --- Past Notable Work --- */
.works-sidebar {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 280px;
}

.sidebar-heading {
  font-size: 13px;
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 4px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 6px;
}

.works-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.works-list a {
  font-size: 14px;
  color: #e0e0e0;
  text-decoration: none;
  transition: color 0.2s ease;
}

.works-list a:hover {
  color: #d90ec1ba;
}

/* --- Social Icons --- */
.frame {
  display: flex;
  gap: 14px;
  margin-top: 10px;
  justify-content: flex-start;
}

.frame img {
  height: 32px;
  width: 32px;
  opacity: 0.85;
  transition: opacity 0.2s, transform 0.2s;
  filter: drop-shadow(0 0 2px #fff2);
}

.frame img:hover {
  opacity: 1;
  transform: scale(1.05);
}

/* --- Responsive Collapse for ≤730px --- */
@media (max-width: 730px) {
  .main-content-row {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 16px;
  }

  /* Container & Heading */
  .image-heading-container {
    width: 100%;
    text-align: center;
    margin-bottom: 12px;
    margin-top: 60px; /* <-- pushes content down below navbar */
    position: relative;
  }

  .the-team-heading {
    text-align: center;
    margin: 0 auto 8px;
    display: block;
    font-size: clamp(28px, 6vw, 40px);
    font-weight: 700;
    line-height: 1.2;
  }

  /* Square Image */
  .image-heading-container .image {
    width: 80%;
    aspect-ratio: 1 / 1;          /* keeps it a square */
    max-width: 320px;
    margin: 0 auto 12px;
    object-fit: cover;            /* fills the square */
    display: block;
    border-radius: 4px;
  }

  .names-row {
    justify-content: center;
    gap: 16px;
    margin: 12px 0;
    flex-wrap: wrap;
  }

  .bio-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 16px;
  }

  .bio-text {
    column-count: 1;
    max-width: 100%;
    text-align: left;
    margin: 0 auto 12px;
  }

  .works-sidebar {
    order: 2;
    width: 100%;
    max-width: 320px;
    margin: 16px auto 0;
    text-align: center;
  }

  .works-list {
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }

  .works-list a {
    font-size: 13px;
    white-space: nowrap;
  }

  /* Social Icons Centered */
  .frame {
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin-top: 10px;
  }
}




</style>

