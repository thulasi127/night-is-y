<template>
  <div class="quote-card" :class="quoteClass">
    <div v-if="quote.text" class="quote-text">
      <span :class="textClass">{{ quote.text }}</span>
    </div>
    <div v-if="quote.logo" class="logo-row">
      <img
        :src="formatLogoPath(quote.logo)"
        class="quote-logo"
        alt="logo"
        loading="lazy"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  quote: Object,
  idx: Number
});

function formatLogoPath(path: string) {
  return path.replace(/^\.\.\/public/, '');
}

const textClass = [
  'major-quote',
  'emphasis-quote',
  'variation-quote'
][$props.idx % 3];

const quoteClass = !$props.quote.text ? 'laurel-card' : '';
</script>

<style scoped>
.quote-card {
  background: rgba(30,30,30,0.95);
  border-radius: 1.5rem;
  margin-bottom: 2.5rem;
  padding: 2.5rem 2rem 2rem 2rem;
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
}

.major-quote {
  font-size: 2.1rem;
  font-weight: 900;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 0.03em;
  text-align: center;
}

.emphasis-quote {
  font-size: 1.7rem;
  font-style: italic;
  font-weight: 700;
  color: #b48cff;
  text-align: center;
}

.variation-quote {
  font-size: 1.5rem;
  font-weight: 300;
  color: #b0b0b0;
  text-align: center;
}

.logo-row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.2rem;
}

.quote-logo {
  max-height: 60px;
  max-width: 180px;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.laurel-card {
  background: transparent;
  box-shadow: none;
  padding: 1.5rem 0;
}

/* ---------- Large Laptops (≤1440px) ---------- */
@media (max-width: 1440px) {
  .quote-card {
    padding: 2rem 1.6rem 1.6rem 1.6rem;
    margin-bottom: 2rem;
    gap: 1rem;
  }
  .major-quote { font-size: 1.8rem; }
  .emphasis-quote { font-size: 1.5rem; }
  .variation-quote { font-size: 1.3rem; }
  .quote-logo { max-height: 50px; max-width: 160px; }
}

/* ---------- Tablets & Small Laptops (≤1024px) ---------- */
@media (max-width: 1024px) {
  .quote-card {
    padding: 1.8rem 1.4rem;
    margin-bottom: 1.8rem;
    gap: 0.9rem;
  }
  .major-quote { font-size: 1.6rem; }
  .emphasis-quote { font-size: 1.3rem; }
  .variation-quote { font-size: 1.1rem; }
  .quote-logo { max-height: 46px; max-width: 140px; }
}

/* ---------- Tablets Portrait & Large Phones (≤768px) ---------- */
@media (max-width: 768px) {
  .quote-card {
    padding: 1.5rem 1rem;
    margin-bottom: 1.5rem;
    gap: 0.8rem;
  }
  .major-quote { font-size: 1.4rem; }
  .emphasis-quote { font-size: 1.2rem; }
  .variation-quote { font-size: 1rem; }
  .quote-logo { max-height: 40px; max-width: 120px; }
}

/* ---------- Small Phones (≤430px) ---------- */
@media (max-width: 430px) {
  .quote-card {
    padding: 1.2rem 0.8rem;
    margin-bottom: 1.2rem;
    gap: 0.6rem;
    border-radius: 1rem;
  }
  .major-quote { font-size: 1.2rem; }
  .emphasis-quote { font-size: 1rem; }
  .variation-quote { font-size: 0.9rem; }
  .quote-logo { max-height: 36px; max-width: 100px; }
}

</style>