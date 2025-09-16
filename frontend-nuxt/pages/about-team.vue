<template>
  <div class="about-team-page">
    <NavBar />
    <div class="about-page-devery-content">
      <div class="header-row">
        <h1 class="the-team-heading">THE TEAM</h1>
      </div>
      <div class="main-content-row">
        <img
          class="image"
          alt="Devery Jacobs Headshot"
          src="https://c.animaapp.com/Wqg9SAYU/img/headshot-devery.jpg"
        />
        <div class="main-text-block">
          <div class="names-row">
            <span class="devery-jacobs overline">DEVERY JACOBS</span>
            <span class="dw-waterson overline">D.W. WATERSON</span>
          </div>
          <div class="devery-meta">
            <span class="span">
              KAWENNAHERE DEVERY JACOBS<br />
              PRODUCER &amp; ACTOR (SHE/HER)
            </span>
          </div>
          <span class="text-wrapper-4">
            KAWENNAHERE DEVERY JACOBS IS A FILMMAKER, ACTOR, AND WRITER
            KNOWN FOR STARRING IN AWARD-WINNING PROJECTS LIKE RHYMES FOR
            YOUNG GHOULS, THE ORDER, AND RESERVATION DOGS. AS A CO-FOUNDER
            OF NIGHT IS Y, DEVERY BRINGS A SHARP, PERSONAL LENS TO STORIES
            CENTERING IDENTITY, RESILIENCE, AND QUEER PERSPECTIVES. SHE'S
            A TIFF RISING STAR AND A POWERFUL VOICE IN CANADA'S CREATIVE
            SCENE, BOTH IN FRONT OF AND BEHIND THE CAMERA.
          </span>
          <br /><br />
          <span class="text-wrapper-5">
            PAST NOTABLE WORK:
          </span>
          <br />
          <span class="text-wrapper-4">
            RESERVATION DOGS · RHYMES FOR YOUNG GHOULS · THE ORDER ·
            BACKSPOT
          </span>
          <div class="frame">
            <img
              class="imdb-logo"
              alt="Imdb logo"
              src="https://c.animaapp.com/Wqg9SAYU/img/imdb-logo@2x.png"
            />
            <Instagram
              class="instagram-instance"
              img="https://c.animaapp.com/Wqg9SAYU/img/instagram.svg"
              size="forty-eight"
            />
            <Youtube
              class="youtube-instance"
              img="https://c.animaapp.com/Wqg9SAYU/img/youtube.svg"
              size="forty-eight"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "../components/NavBar.vue";
import Instagram from "../components/Instagram.vue";
import Youtube from "../components/Youtube.vue";

export default defineComponent({
  name: "AboutTeamPage",
  components: {
    NavBar,
    Instagram,
    Youtube,
  },
});
</script>

<style scoped>
.about-team-page {
  background: #000;
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.about-page-devery-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 120px; /* space below navbar */
  width: 100%;
}

.header-row {
  margin-left: 42px;
  margin-top: 64px;
}

.the-team-heading {
  width: 626px; /* Match the image width */
  height: 106px;
  font-family: "Right Grotesk", Helvetica, Arial, sans-serif;
  font-size: 100px;
  font-weight: 900;
  line-height: 30px;
  color: white;
  letter-spacing: 0;
  word-wrap: break-word;
  text-transform: none;
  margin-bottom: 0;
  align-items: flex-end;
  text-align: right;
  text-transform: uppercase;
}

.main-content-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  justify-content: flex-start;
  margin-left: 42px;
}

.image {
  width: 626px;
  height: 708px;
  object-fit: cover;
  margin-right: 64px;
}

.main-text-block {
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  font-family: "Right Grotesk", Helvetica, Arial, sans-serif;
  font-size: 48px;
  font-weight: 900;
  line-height: 45px;
  color: white;
  letter-spacing: 0;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-transform: none;
  text-decoration: overline;
  text-decoration-thickness: 3px;
  text-decoration-color: #d90ec1ba;
}

.dw-waterson,
.dw-waterson.overline {
  font-family: "Right Grotesk", Helvetica, Arial, sans-serif;
  font-size: 48px;
  font-weight: 900;
  line-height: 45px;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-transform: uppercase;
  text-decoration: overline;
  text-decoration-thickness: 3px;
  text-decoration-color: rgba(255, 255, 255, 0.5);
  transition: color 0.2s;
}

.dw-waterson:hover,
.dw-waterson.overline:hover {
  color: rgba(255, 255, 255, 0.75);
  text-decoration-color: rgba(255, 255, 255, 0.75);
}

.devery-meta {
  font-family: "Neue Montreal", Helvetica, Arial, sans-serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: 0;
  color: #fff;
  margin-bottom: 32px;
  margin-top: 24px;
}

.span {
  font-weight: 500;
  font-size: 28px;
  line-height: 1.2;
}

.text-wrapper-4 {
  font-family: "Neue Montreal-Regular", Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0;
  color: #fff;
}

.text-wrapper-5 {
  font-family: "Neue Montreal-Bold", Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: 0;
  color: #fff;
  margin-top: 24px;
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

.label .span {
  font-family: "Neue Montreal-Light", Helvetica;
  font-size: 16px;
  font-weight: 300;
}

.label .text-wrapper-2 {
  font-family: "Neue Montreal-Regular", Helvetica;
  font-size: 16px;
}

.label .text-wrapper-3 {
  font-family: "Neue Montreal-Bold", Helvetica;
  font-size: 16px;
  font-weight: 700;
}
</style>
