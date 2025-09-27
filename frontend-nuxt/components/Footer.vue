<template>
  <footer class="site-footer">
    <p style="font-family: 'proxima-nova', sans-serif; font-weight: 100; font-style: italic;">
      2025 Copyright Night is Y ©
    </p>
  </footer>
</template>

<script setup>
// No logic needed for now — purely presentational
</script>

<style scoped>
.site-footer {
  width: 100%;
  text-align: center;
  padding: 20px 0;
  background: transparent; /* Transparent so it inherits the page background */
  color: #fff;
  font-family: "proxima-nova", sans-serif;
  font-weight: 100;
  font-style: normal;
  font-size: 14px;
  letter-spacing: 0.5px;
  opacity: 0.7; /* Subtle look */
}

.site-footer p {
  margin: 0;
}

/* ---------- Large Laptops (≤1440px) ---------- */
@media (max-width: 1440px) {
  .site-footer {
    font-size: 13px;
    padding: 18px 0;
  }
}

/* ---------- Tablets & Small Laptops (≤1024px) ---------- */
@media (max-width: 1024px) {
  .site-footer {
    font-size: 12px;
    padding: 16px 0;
  }
}

/* ---------- Tablets Portrait & Large Phones (≤768px) ---------- */
@media (max-width: 768px) {
  .site-footer {
    font-size: 11px;
    padding: 14px 0;
  }
}

/* ---------- Small Phones (≤430px) ---------- */
@media (max-width: 430px) {
  .site-footer {
    font-size: 10px;
    padding: 12px 0;
    letter-spacing: 0.3px;
  }
}
</style>