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
</style>