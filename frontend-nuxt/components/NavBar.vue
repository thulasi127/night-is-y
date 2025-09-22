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

      <!-- Middle brand text instead of PNG -->
      <div class="nav-brand-text">NIGHT IS Y</div>

      <!-- Right nav links -->
      <nav class="nav">
        <NuxtLink to="/about" class="nav-link">ABOUT</NuxtLink>
        <NuxtLink to="/projects" class="nav-link">WORK</NuxtLink>
        <NuxtLink to="/press" class="nav-link">PRESS</NuxtLink>
        <NuxtLink to="/contact" class="nav-link">CONTACT</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavBar",
});
</script>

<style>
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
  width: auto;
  object-fit: contain;
  transition: opacity 0.3s ease;
  justify-self: start;
}
.logo:hover {
  opacity: 0.8;
}

/* Middle brand text (replaces PNG) */
.nav-brand-text {
  font-family: "proxima-nova", sans-serif;
  font-weight: 300; /* Light */
  font-style: normal;
  font-size: clamp(18px, 2vw, 24px); /* responsive min–max */
  letter-spacing: 0.41em; /* Kerning = 410 */
  color: #fff;
  text-transform: none;
  justify-self: center;
}


.nav-brand-text {
  font-family: "proxima-nova", sans-serif;
  font-weight: 300;
  font-style: normal;
  font-size: clamp(18px, 2vw, 24px); /* responsive min–max */
  letter-spacing: 0.41em;
  color: #fff;
  text-transform: none;
  justify-self: center;

  /* Subtle glow */
  text-shadow: 
    0 0 4px rgba(255, 0, 255, 0.5),   /* magenta glow */
    0 0 8px rgba(104, 8, 171, 0.4);  /* purple glow */
}


/* Right nav links */
.nav {
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-self: end;
}

.nav-link {
  color: #ffffff;
  font-family: "proxima-nova", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  text-decoration: none;
  text-transform: uppercase; /* ensure all caps */
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  position: relative;
}
.nav-link:hover {
  color: #593792 !important;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: #ffffff;
  transition: width 0.3s ease;
}
.nav-link:hover::after {
  width: 100%;
}
</style>
