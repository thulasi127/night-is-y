<template>
  <div class="press-page">
    <div class="intro">
      <h1 class="headline">THEY SAID IT BEST</h1>
    </div>
    <section v-for="(project, idx) in pressData" :key="idx" class="project-section">
      <h2 class="project-title">{{ project.project }}</h2>
      <div class="quotes-grid">
        <QuoteCard
          v-for="(quote, qIdx) in project.quotes"
          :key="qIdx"
          :quote="quote"
          :idx="qIdx"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import QuoteCard from '~/components/QuoteCard.vue';

const pressData = ref([]);

onMounted(async () => {
  const res = await fetch('/data/press.json');
  pressData.value = await res.json();
});
</script>

<style scoped>
.press-page {
  background: #111;
  min-height: 100vh;
  padding-bottom: 4rem;
}

.intro {
  padding: 3rem 0 2rem 0;
  text-align: center;
}

.headline {
  font-family: 'Bebas Neue', 'Oswald', 'Montserrat', sans-serif;
  font-size: 3.5rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  color: #b48cff;
  margin-bottom: 1.5rem;
}

.project-section {
  margin-bottom: 4rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #222;
}

.project-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 2.5rem;
  letter-spacing: 0.04em;
  color: #fff;
  text-transform: uppercase;
  text-align: left;
}

.quotes-grid {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}
@media (max-width: 600px) {
  .headline {
    font-size: 2.2rem;
  }
  .project-title {
    font-size: 1.2rem;
  }
  .quotes-grid {
    gap: 1.5rem;
  }

}

/* ---------- Large Laptops (≤1440px) ---------- */
@media (max-width: 1440px) {
  .headline {
    font-size: 3rem;
  }
  .project-title {
    font-size: 1.8rem;
  }
  .quotes-grid {
    gap: 2rem;
  }
}

/* ---------- Tablets & Small Laptops (≤1024px) ---------- */
@media (max-width: 1024px) {
  .headline {
    font-size: 2.6rem;
  }
  .project-title {
    font-size: 1.6rem;
    margin-bottom: 2rem;
  }
  .quotes-grid {
    gap: 1.8rem;
  }
}

/* ---------- Tablets Portrait & Large Phones (≤768px) ---------- */
@media (max-width: 768px) {
  .headline {
    font-size: 2.4rem;
    margin-bottom: 1.2rem;
  }
  .project-title {
    font-size: 1.4rem;
    margin-bottom: 1.6rem;
    text-align: center;
  }
  .quotes-grid {
    gap: 1.6rem;
    padding: 0 1rem;
  }
}

/* ---------- Small Phones (≤430px) ---------- */
@media (max-width: 430px) {
  .headline {
    font-size: 2rem;
  }
  .project-title {
    font-size: 1.2rem;
    margin-bottom: 1.2rem;
  }
  .quotes-grid {
    gap: 1.2rem;
    padding: 0 0.5rem;
  }
}

</style>