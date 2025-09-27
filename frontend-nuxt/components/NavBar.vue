<template>
  <header class="navbar">
    <div class="navbar-content">
      <!-- Left logo -->
      <NuxtLink to="/home">
        <img
          class="logo"
          alt="Night IS y"
          src="/Image/NIY-logos/niy-logo-3.png"
        />
      </NuxtLink>

      <!-- Middle brand text -->
      <div class="nav-brand-text">NIGHT IS Y</div>

      <!-- Right nav links -->
      <nav class="nav">
        <NuxtLink to="/about" class="nav-link">ABOUT</NuxtLink>

        <!-- Work dropdown -->
        <div
          class="dropdown"
          @mouseenter="open = true"
          @mouseleave="open = false"
        >
          <div class="nav-link">WORK</div>
          <transition name="fade-slide">
            <div v-if="open" class="dropdown-list">
              <div class="dropdown-line"></div>
              <NuxtLink to="/film-series" class="dropdown-item">FILM & SERIES</NuxtLink>
              <NuxtLink to="/music-videos" class="dropdown-item">MUSIC VIDEOS</NuxtLink>
              <NuxtLink to="/development" class="dropdown-item">IN DEVELOPMENT</NuxtLink>
            </div>
          </transition>
        </div>

        <NuxtLink to="/press" class="nav-link">PRESS</NuxtLink>
        <NuxtLink to="/contact" class="nav-link">CONTACT</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "NavBar",
  setup() {
    const open = ref(false);
    return { open };
  },
});
</script>

<style>
/* Base Navbar Styles */
.navbar {
  background-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 120px;
}

.navbar-content {
  max-width: 1728px;
  margin: 0 auto;
  height: 100%;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.logo {
  height: 80px;
  object-fit: contain;
  transition: opacity 0.3s ease;
}
.logo:hover {
  opacity: 0.8;
}

/* Brand text */
.nav-brand-text {
  font-family: "proxima-nova", sans-serif;
  font-weight: 300;
  font-style: normal;
  font-size: clamp(18px, 2vw, 24px);
  letter-spacing: 0.41em;
  color: #fff;
  justify-self: center;
}

/* Nav links */
.nav {
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-self: end;
  position: relative;
}

.nav-link {
  color: #ffffff;
  font-family: "proxima-nova", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  text-transform: uppercase;
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease, opacity 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -6px;
  right: 0;
  width: 0;
  height: 1px;
  background: #ffffff;
  opacity: 0.5;
  transition: width 0.3s ease;
}
.nav-link:hover::after {
  width: 100%;
  opacity: 1;
}

/* Hover dim effect */
.nav:hover .nav-link {
  opacity: 0.3;
}
.nav-link:hover {
  opacity: 1 !important;
}

/* Dropdown Styles */
.dropdown {
  position: relative;
}

.dropdown-list {
  position: absolute;
  top: calc(100% + 1px); /* starts right below WORK underline */
  left: 0;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem 2rem;
  gap: 0.5rem;
  min-width: 180px;
}

/* Dropdown container */
.dropdown-list {
  position: absolute;
  top: 100%; /* start exactly under WORK underline */
  left: 0;
  margin-left: -10px; /* shift text slightly left */
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.8rem 1.5rem;
  gap: 0.5rem;
  min-width: 180px;
}

/* Vertical line starts at bottom-left corner of WORK underline */
.dropdown-line {
  position: absolute;
  top: 0;  /* starts right at WORK underline */
  left: 0;
  transform: translateY(1px); /* moves line slightly down so it doesn’t intersect */
  width: 1px;
  height: 100%;
  background: #ffffff33;
}

/* Dropdown item styles */
.dropdown-item {
  color: #ffffff;
  font-family: "proxima-nova", sans-serif;
  font-weight: 100;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  padding: 0.2rem 0;
  transition: opacity 0.3s ease, color 0.3s ease;
  opacity: 1;
}

/* Hover effect: hovered item stays white, others fade */
.dropdown-list:hover .dropdown-item {
  opacity: 0.7;
}
.dropdown-item:hover {
  opacity: 1 !important;
  color: #ffffff;
}
</style>
