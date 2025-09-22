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
  /* Slightly bigger again: Min 1.2rem, preferred 2vw, max 1.5rem */
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  /* line-height: 1.7; */
  font-weight: 300;
  color: #f5f5f5;
  max-width: 900px;
  margin: 0 auto;
  letter-spacing: 0.5px;
  text-transform: none;
}

.meet-the-team-link {
  /* Slightly bigger again: Min 1.8rem, preferred 2.9vw, max 2.4rem */
  font-size: clamp(1.8rem, 2.9vw, 2.4rem);
  font-family: "anton", sans-serif;
  font-weight: 300;
  text-transform: uppercase;
  /* line-height: 1.2; */
  padding: 16px 40px;
  border-radius: 40px;
  text-decoration: none;
  cursor: pointer;
  background: linear-gradient(270deg, #6808AB, #D90EC1, #83A780, #fff, #6808AB);
  background-size: 600% 600%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientMove 3s ease infinite;
  transition: transform 0.2s;
}

.meet-the-team-link:hover {
  transform: scale(1.08);
  -webkit-text-fill-color: #593792;
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