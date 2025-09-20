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
              <a :href="work.url" target="_blank" rel="noopener noreferrer">
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
  </div>
</template>

<script lang="ts" setup>
import NavBar from "../components/NavBar.vue";
import bioData from '~/data/bio.json';

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
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Align heading and image to the right */
  width: 626px;
  margin-right: 64px;
  position: relative;
}

.the-team-heading {
  width: 100%;
  height: 106px;
  font-family: "Impact", Helvetica, Arial, sans-serif;
  font-size: 100px;
  font-weight: 900;
  line-height: 30px;
  color: white;
  letter-spacing: 0;
  word-wrap: break-word;
  text-transform: uppercase;
  margin-bottom: 0;
  text-align: right;
  margin-top: 144px; /* Increased from 128px */
  margin-bottom: 0;
}

.image {
  width: 626px;
  height: 708px;
  object-fit: cover;
  opacity: 1; /* Ensure image is always visible */
  transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.image.loaded {
  opacity: 1;
}

.main-text-block {
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 240px; /* Increased from 220px */
}

.names-row {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 48px;
  margin-bottom: 16px;
  width: 100%;
  white-space: nowrap;
}

.devery-jacobs,
.devery-jacobs.overline {
  font-family: "Impact", Helvetica, Arial, sans-serif;
  font-size: 48px;
  font-weight: 900;
  line-height: 45px;
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
  font-family: "Impact", Helvetica, Arial, sans-serif;
  font-size: 48px;
  font-weight: 900;
  line-height: 45px;
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
  font-family: "Impact", Helvetica, Arial, sans-serif;
  font-size: 24px;
  font-weight: 500;
  color: #fff;
  margin-bottom: 32px;
  margin-top: 24px;
}

.text-wrapper-4 {
  font-family: "Neue Montreal", Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: 0px;
  color: #fff;
  text-transform: none;
}

.text-wrapper-5 {
  font-family: "Neue Montreal", Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: 0px;
  color: #fff;
  margin-top: 24px;
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
  font-family: "Impact", Helvetica, Arial, sans-serif;
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
  font-family: "Neue Montreal", Helvetica, Arial, sans-serif;
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
  width: 256px;
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 32px;
}

.imdb-logo {
  aspect-ratio: 1;
  height: 48px;
  width: 48px;
  object-fit: cover;
}

.instagram-instance,
.youtube-instance {
  height: 48px !important;
  width: 48px !important;
  position: static !important;
}

/* Optional: responsive tweaks for the 626px column can go here */
</style>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>
