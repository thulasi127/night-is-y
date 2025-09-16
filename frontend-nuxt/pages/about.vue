<template>
  <div class="about-page-NIY">
    <NavBar />
    <div class="centered-content">
      <div class="content">
        <p class="NIY-is-a-film">
          NIY IS A FILM PRODUCTION COMPANY LED BY DIRECTOR D.W. WATERSON AND
          FILMMAKER DEVERY JACOBS.
          <br /> WE CREATE BOLD, EMOTIONALLY DRIVEN WORK THAT REFLECTS REAL
          PEOPLE AND REAL STORIES.
          <br /> FROM FILMS TO SERIES AND MUSIC VIDEOS, NIY IS A HOME FOR
          STORYTELLING THAT MOVES, QUESTIONS, AND CONNECTS.
          </p>
          <NuxtLink to="/about-team" class="meet-the-team-cta">
            MEET THE TEAM
          </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '~/components/NavBar.vue'
</script>

<style scoped>
.about-page-NIY {
  background-color: black;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}

.centered-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 80vh;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  gap: 96px;
}

.NIY-is-a-film {
  color: white;
  font-size: 50px;
  font-family: "Right Grotesk", Helvetica, Arial, sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  line-height: 45px;
  word-wrap: break-word;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  text-align: center;
  margin-bottom: 0;
  letter-spacing: 0;
}

.meet-the-team-cta {
  color: rgba(255, 255, 255, 0.75);
  font-size: 48px;
  font-family: "Right Grotesk", Helvetica, Arial, sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  line-height: 45px;
  word-wrap: break-word;
  text-align: center;
  margin-top: 0;
  letter-spacing: 0;
  padding: 18px 48px;
  border-radius: 40px;
  cursor: pointer;
  text-decoration: none;
  border: none;
  outline: none;
  display: inline-block;
  background: linear-gradient(270deg, #6808AB, #D90EC1, #83A780, #fff, #6808AB);
  background-size: 600% 600%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientMove 3s ease infinite;
  transition: transform 0.2s, color 0.2s, box-shadow 0.2s;
}

.meet-the-team-cta:hover {
  transform: scale(1.08);
  -webkit-text-fill-color: #593792;
  color: #593792;
  background: none;
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>