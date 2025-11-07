<template>
  <div class="about-page-NIY">
    <NavBar />
    <div class="centered-content">
      <div class="content">
        <p class="about-text"> Night is Y is an LGBTQ2S+ and Indigenous-owned production company rooted in Toronto, Canada.<br /> Producers Devery Jacobs and D.W. Waterson craft character-driven films and series that uplift queer and BIPOC stories.<br /> With every project, Night is Y creates dynamic, visually stunning stories driven by risk, rigor, and a vision for authentic representation. </p>
          <NuxtLink to="/about-devery" class="meet-the-team-link">
        <MeetTheTeamText text="Meet the Team" videoSrc="/videos/text-bg.mp4" />
      </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '~/components/NavBar.vue'
import MeetTheTeamText from '~/components/AboutText.vue'

useHead({
  title: 'About | Night is Y',
  meta: [{ name: 'description', content: 'About Night is Y.' }]
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
  font-size: clamp(0.9rem, 1.2vw, 1.2rem); /* Smaller font size */
  font-family: "proxima-nova", sans-serif;
  font-weight: 100; /* Thin */
  font-style: normal; /* Remove italics */
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

/* ---------- Large Laptops (≤1440px) ---------- */
@media (max-width: 1440px) {
  .about-text { max-width: 750px; }
  .content { gap: 48px; }
}

/* ---------- Tablets & Small Laptops (≤1024px) ---------- */
@media (max-width: 1024px) {
  .about-text {
    font-size: 1.2rem;
    max-width: 600px;
  }
  .meet-the-team-link {
    font-size: 2rem;
    padding: 14px 32px;
  }
}

/* ---------- Tablets Portrait & Large Phones (≤768px) ---------- */
@media (max-width: 768px) {
  .content { gap: 40px; padding: 0 20px; }
  .about-text { font-size: 1.1rem; max-width: 500px; }
  .meet-the-team-link { font-size: 1.6rem; padding: 12px 28px; }
}

/* ---------- Small Phones (≤430px) ---------- */
@media (max-width: 430px) {
  .content { gap: 32px; }
  .about-text {
    font-size: 1rem;
    line-height: 1.5;
    max-width: 90%;
  }
  .meet-the-team-link {
    font-size: 1.4rem;
    padding: 10px 24px;
  }
}

</style>