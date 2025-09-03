<template>
  <header class="header">
    <div class="container">
      <!-- Logo (left) -->
      <div class="logo">
        <NuxtLink to="/home" aria-label="Go to homepage" class="logo-link">
          <img
            class="logo-image"
            alt="Logo"
            src="/images/logo-colour.png"
          />
        </NuxtLink>
      </div>

      <!-- Brand (center) -->
      <div class="brand">
        <NuxtLink to="/home" aria-label="NIGHT IS Y">
          <img
            class="brand-image"
            alt="Night IS Y"
            src="https://c.animaapp.com/GSAE547a/img/night-is-y.png"
          />
        </NuxtLink>
      </div>

      <!-- Mobile Menu Button -->
      <button class="mobile-menu-btn" @click="toggleMobileMenu" aria-label="Toggle menu">
        <span class="hamburger-line" :class="{ active: isMobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ active: isMobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ active: isMobileMenuOpen }"></span>
      </button>

      <!-- Navigation (right) -->
      <nav class="nav" :class="{ 'nav-open': isMobileMenuOpen }">
        <NuxtLink to="/about" class="nav-link" @click="closeMenu">
          <img alt="About" src="https://c.animaapp.com/GSAE547a/img/about.png" />
        </NuxtLink>
        <NuxtLink to="/work" class="nav-link" @click="closeMenu">
          <img alt="Work" src="https://c.animaapp.com/GSAE547a/img/work.png" />
        </NuxtLink>
        <NuxtLink to="/press" class="nav-link" @click="closeMenu">
          <img alt="Press" src="https://c.animaapp.com/GSAE547a/img/press.png" />
        </NuxtLink>
        <NuxtLink to="/contact" class="nav-link" @click="closeMenu">
          <img alt="Contact" src="https://c.animaapp.com/GSAE547a/img/contact.png" />
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => (isMobileMenuOpen.value = !isMobileMenuOpen.value)
const closeMenu = () => (isMobileMenuOpen.value = false)
</script>

<style scoped>
/* Larger, responsive gutters (equal on both sides) */
:host {
  --gutter: clamp(32px, 7vw, 120px); /* increase/decrease here */
}

.header {
  position: fixed;
  top: 0; left: 0; right: 0;
  background: transparent; /* keep it see-through */
  z-index: 1000;           /* above the video (z-index: 0) */
}

/* Follow your flex + absolute center pattern, but with larger gutters */
.container {
  max-width: min(1600px, 100%);     /* honor large screens but cap width */
  margin: 0 auto;
  padding: 0 var(--gutter);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

/* Left */
.logo { flex-shrink: 0; }
.logo-link { display: inline-flex; align-items: center; }
.logo-image { height: clamp(48px, 5vw, 80px); width: auto; object-fit: contain; }

/* Center (absolute to keep it perfectly centered regardless of left/right widths) */
.brand {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}
.brand-image { height: clamp(22px, 2.2vw, 34px); width: auto; object-fit: contain; }

/* Right */
.nav { display: flex; align-items: center; gap: clamp(20px, 2.2vw, 40px); }
.nav-link { text-decoration: none; transition: opacity .3s ease; }
.nav-link:hover { opacity: .7; }
.nav-link img { height: 21px; width: auto; object-fit: contain; }

/* Mobile menu button (hidden on desktop) */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  z-index: 1001;
}
.hamburger-line {
  width: 25px; height: 3px; background-color: #333;
  margin: 3px 0; transition: .3s; transform-origin: center;
}
.hamburger-line.active:nth-child(1) { transform: rotate(45deg) translate(6px, 6px); }
.hamburger-line.active:nth-child(2) { opacity: 0; }
.hamburger-line.active:nth-child(3) { transform: rotate(-45deg) translate(6px, -6px); }

/* Tablet */
@media (max-width: 1024px) {
  .container { padding: 0 calc(var(--gutter) * 0.7); }
  .logo-image { height: clamp(40px, 5vw, 60px); }
  .brand-image { height: clamp(20px, 2vw, 26px); }
}

/* Mobile */
@media (max-width: 768px) {
  .container { padding: 0 calc(var(--gutter) * 0.6); }
  .mobile-menu-btn { display: flex; }

  .nav {
    position: fixed;
    top: 0;
    right: -100%;
    height: 100vh;
    width: min(80vw, 280px);
    background-color: white;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
    transition: right .3s ease;
    box-shadow: -2px 0 10px rgba(0,0,0,.1);
    z-index: 999;
    padding-inline: 24px;
  }
  .nav-open { right: 0; }

  .nav-link img { height: 24px; }
  .logo-image { height: 45px; }
  .brand-image { height: 20px; }
}

/* Small Mobile */
@media (max-width: 480px) {
  .container { padding: 0 calc(var(--gutter) * 0.5); }
  .nav { width: min(82vw, 240px); }
  .nav-link img { height: 20px; }
}

/* Very large desktops: slightly wider spacing */
@media (min-width: 1600px) {
  .nav { gap: 48px; }
}
</style>
