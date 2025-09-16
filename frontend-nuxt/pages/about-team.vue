<template>
  <div class="about-page-devery">
    <NavBar />
    <div class="main-content">
      <div class="left-image-block">
        <div class="the-team-title">THE TEAM</div>
        <img
          class="image"
          alt="Image"
          src="https://c.animaapp.com/Wqg9SAYU/img/headshot-devery.jpg"
        />
      </div>
      <div class="right-info-block">
        <div class="names-row">
          <span class="devery-jacobs overline">DEVERY JACOBS</span>
          <span class="text-wrapper-2 overline">D.W. WATERSON</span>
        </div>
        <div class="bio-block">
          <p class="kawennahere-devery">
            <span class="span">
              KAWENNAHERE DEVERY JACOBS <br />
              PRODUCER &amp; ACTOR (SHE/HER)
            </span>
            <span class="text-wrapper-3"> </span>
            <span class="text-wrapper-4">
              KAWENNAHERE DEVERY JACOBS IS A FILMMAKER, ACTOR, AND WRITER
              KNOWN FOR STARRING IN AWARD-WINNING PROJECTS LIKE RHYMES FOR
              YOUNG GHOULS, THE ORDER, AND RESERVATION DOGS. AS A CO-FOUNDER
              OF NIGHT IS Y, DEVERY BRINGS A SHARP, PERSONAL LENS TO STORIES
              CENTERING IDENTITY, RESILIENCE, AND QUEER PERSPECTIVES. SHE'S
              A TIFF RISING STAR AND A POWERFUL VOICE IN CANADA'S CREATIVE
              SCENE, BOTH IN FRONT OF AND BEHIND THE CAMERA.
              <br />
            </span>
            <span class="text-wrapper-5">
              <br />
              PAST NOTABLE WORK:
            </span>
            <span class="text-wrapper-3"> </span>
            <span class="text-wrapper-4">
              RESERVATION DOGS · RHYMES FOR YOUNG GHOULS · THE ORDER ·
              BACKSPOT
            </span>
            <span class="text-wrapper-3"> </span>
          </p>
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
  name: "AboutPageDevery",
  components: {
    NavBar,
    Instagram,
    Youtube,
  },
});
</script>

<style>
.about-page-devery {
  background: #000;
  min-height: 100vh;
  width: 100vw;
  position: relative;
}

.main-content {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  margin-top: 120px; /* Space for navbar and "The Team" title */
  width: 100vw;
  gap: 48px;
}

.left-image-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
}

.the-team-title {
  color: #ffffff;
  font-family: "Right Grotesk-SpatialBlack", Helvetica;
  font-size: 100px;
  font-weight: 900;
  letter-spacing: 0;
  line-height: 1;
  margin-bottom: 24px;
  margin-left: 42px;
}

.image {
  width: 626px;
  height: 708px;
  object-fit: cover;
  margin-left: 0;
}

.right-info-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-width: 600px;
  margin-top: 0;
}

.names-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 32px;
  margin-bottom: 32px;
  /* Align with top of image */
  margin-top: 0;
}

.devery-jacobs.overline,
.text-wrapper-2.overline {
  font-family: "Right Grotesk-SpatialBlack", Helvetica;
  font-size: 48px;
  font-weight: 900;
  line-height: 45px;
  white-space: nowrap;
  text-decoration: overline;
  text-decoration-thickness: 3px;
}

.devery-jacobs.overline {
  color: #fff;
  text-decoration-color: #d90ec1ba;
}

.text-wrapper-2.overline {
  color: #ffffff80;
  text-decoration-color: rgba(255,255,255,0.75);
}

.bio-block {
  margin-top: 0;
}

.kawennahere-devery {
  color: #ffffff;
  font-family: "Neue Montreal-Medium", Helvetica;
  font-size: 24px;
  font-weight: 400;
  line-height: 30px;
  margin-bottom: 16px;
}

.span {
  font-weight: 500;
}

.text-wrapper-3 {
  font-family: "Neue Montreal-Light", Helvetica;
  font-size: 16px;
  font-weight: 300;
}

.text-wrapper-4 {
  font-family: "Neue Montreal-Regular", Helvetica;
  font-size: 16px;
}

.text-wrapper-5 {
  font-family: "Neue Montreal-Bold", Helvetica;
  font-size: 16px;
  font-weight: 700;
}

.frame {
  display: flex;
  flex-direction: row;
  gap: 24px;
  margin-top: 32px;
}

.imdb-logo {
  height: 48px;
  width: 48px;
  object-fit: contain;
}

.instagram-instance,
.youtube-instance {
  height: 48px !important;
  width: 48px !important;
}
</style>
