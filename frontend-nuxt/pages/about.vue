<template>
  <div class="about-page-NIY">
    <NavBar />
    <div class="centered-content">
      <div class="content">
        <p class="about-text"> Night is Y is an LGBTQ2S+ and Indigenous-owned production company<br /> rooted in Toronto, Canada.<br /> Producers Devery Jacobs and D.W. Waterson craft character-driven films<br /> and series that uplift queer and BIPOC stories.<br /> With every project, Night is Y creates dynamic, visually stunning stories<br /> driven by risk, rigor, and a vision for authentic representation. </p>
          <NuxtLink to="/about-devery" class="meet-the-team-link">
            Meet the Team
          </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '~/components/NavBar.vue'

useHead({
  title: 'About | NIGHT is Y',
  meta: [{ name: 'description', content: 'About NIGHT is Y.' }]
})
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
  gap: 64px; /* Slightly reduced gap for balance */
  text-align: center; /* Center all content */
}

.about-text {
  font-size: clamp(1.2rem, 2.2vw, 1.6rem);  /* larger, responsive */
  font-weight: 300;
  color: #f5f5f5;

  /* force text to break into fewer lines */
  max-width: 900px;
  margin: 0 auto;
  letter-spacing: 0.5px;
  text-transform: none; /* keep natural casing */
}

.meet-the-team-link {
  color: rgba(255, 255, 255, 0.75);
  font-size: 48px;
  font-family: "anton", sans-serif;
  font-weight: 300;
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

.meet-the-team-link:hover {
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