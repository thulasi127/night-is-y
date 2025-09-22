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
            alt="Devery Jacobs Headshot"
            src="/Image/Headshots/headshot-1.jpg"
          />
        </div>
        <div class="main-text-block">
          <div class="names-row">
            <span class="devery-jacobs overline">DEVERY JACOBS</span>
            <NuxtLink to="/about-dw" class="dw-waterson overline">D.W. WATERSON</NuxtLink>
          </div>
          <div class="devery-meta">
            <span class="span">
              KAWENNAHERE DEVERY JACOBS (She/Her)<br />
              PRODUCER &amp; ACTOR
            </span>
          </div>
          <span class="text-wrapper-4">
            Kawennáhere Devery Jacobs is an award-winning actor, filmmaker and one of Hollywood’s most exciting rising stars. As a socially conscious voice from Kahnawà:ke Mohawk Territory, they use their platform to advocate for Indigenous and LGBTQ2S+ rights.
          </span>
          <br /><br />
          <span class="text-wrapper-5">
            PAST NOTABLE WORK:
          </span>
          <div class="notable-works-horizontal">
            <template v-for="(work, idx) in sortedWorks" :key="work.title">
              <a :href="work.url" target="_blank" rel="noopener noreferrer">
                {{ work.title }}
              </a>
              <span v-if="idx < sortedWorks.length - 1" class="dot">•</span>
            </template>
          </div>
          <div class="frame">
            <a
              href="https://www.imdb.com/name/nm2711203/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                class="imdb-logo"
                alt="Imdb logo"
                src="https://c.animaapp.com/Wqg9SAYU/img/imdb-logo@2x.png"
              />
            </a>
            <a
              href="https://www.instagram.com/deveryjacobs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram
                class="instagram-instance"
                img="https://c.animaapp.com/Wqg9SAYU/img/instagram.svg"
                size="forty-eight"
              />
            </a>
            <a
              href="https://www.youtube.com/watch?v=50tELFkt6RM"
              target="_blank"
              rel="noopener noreferrer"
            >
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

useHead({
  title: 'About | NIGHT is Y',
  meta: [{ name: 'description', content: 'About NIGHT is Y.' }]
})
import { defineComponent, computed, ref, onMounted } from "vue";
import NavBar from "../components/NavBar.vue";
import Instagram from "../components/Instagram.vue";
import Youtube from "../components/Youtube.vue";

const works = [
  {
    title: "Marvel Studios' Echo",
    url: "https://www.youtube.com/watch?v=AFUKnherhuw&feature=youtu.be",
  },
  {
    title: "Reservation Dogs Season 1",
    url: "https://www.youtube.com/watch?v=YWYVTyhFAOU&feature=youtu.be",
  },
  {
    title: "Reservation Dogs Season 2",
    url: "https://www.youtube.com/watch?v=PInqPhN5YjQ&feature=youtu.be",
  },
  {
    title: "Reservation Dogs Season 3",
    url: "https://www.youtube.com/watch?v=rGz501EhVJs&feature=youtu.be",
  },
  {
    title: "Rhymes for Young Ghouls",
    url: "https://www.youtube.com/watch?v=-kk7IxWINLQ&feature=youtu.be",
  },
];

export default defineComponent({
  name: "AboutTeamPage",
  components: {
    NavBar,
    Instagram,
    Youtube,
  },
  setup() {
    const sortedWorks = computed(() =>
      [...works].sort((a, b) => a.title.localeCompare(b.title))
    );
    const imgLoaded = ref(false);
    onMounted(() => {
      const img = document.querySelector('.image');
      if (img) {
        img.addEventListener('load', () => {
          img.classList.add('loaded');
        });
      }
    });
    return { sortedWorks };
  },
});
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
.devery-jacobs.overline,
.dw-waterson,
.dw-waterson.overline {
  font-family: "anton", sans-serif;
  font-size: clamp(28px, 3vw, 36px); /* reduced from 48px */
  line-height: 1.2;
  font-weight: 900;
  letter-spacing: 0;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: overline;
  text-decoration-thickness: 3px;
}
.devery-jacobs,
.devery-jacobs.overline {
  color: white;
  text-transform: none;
  text-decoration-color: #d90ec1ba;
}
.dw-waterson,
.dw-waterson.overline {
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  text-decoration-color: rgba(255, 255, 255, 0.5);
  transition: color 0.2s, text-decoration-color 0.2s;
  cursor: pointer;
}

.dw-waterson:hover,
.dw-waterson.overline:hover {
  color: rgba(255, 255, 255, 0.75);
  text-decoration-color: rgba(255, 255, 255, 0.75);
}

.notable-works-horizontal a {
  font-family: "anton", sans-serif;
  font-weight: 300;
  font-size: 16px;
  color: #fff;
  line-height: 30px;
  letter-spacing: 0;
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
  font-weight: 600;
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
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  text-decoration: underline;
  text-transform: none;
  letter-spacing: 0px;
  line-height: 30px;
  transition: color 0.2s;
  white-space: nowrap;
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

/* --- Responsive Layout --- */
@media (max-width: 768px) {
  .main-content-row {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .image-heading-container {
    width: 100%;
    margin-right: 0;
    align-items: center;
  }

  .main-text-block {
    margin-top: 40px;
    align-items: center;
  }
}
</style>
