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

      <!-- Center brand text -->
      <div class="nav-brand-text">NIGHT IS Y</div>

      <!-- Desktop Nav (only when screen is large) -->
      <nav class="nav desktop-nav" v-if="!isMobile">
  <NuxtLink 
    to="/about" 
    class="nav-link" 
    :class="{ active: ['/about', '/about-devery', '/about-dw'].includes(route.path) }"
  >ABOUT</NuxtLink>

  <div class="dropdown" @mouseenter="open = true" @mouseleave="open = false">
    <NuxtLink 
      to="/projects" 
      class="nav-link"
      :class="{ active: ['/projects', '/film-series', '/music-videos', '/development'].includes(route.path) }"
    >WORK</NuxtLink>
    <transition name="fade-slide">
      <div v-if="open" class="dropdown-list">
        <div class="dropdown-line"></div>
        <NuxtLink to="/film-series" class="dropdown-item">FILM & SERIES</NuxtLink>
        <NuxtLink to="/music-videos" class="dropdown-item">MUSIC VIDEOS</NuxtLink>
        <NuxtLink to="/development" class="dropdown-item">IN DEVELOPMENT</NuxtLink>
      </div>
    </transition>
  </div>

  <NuxtLink 
    to="/press" 
    class="nav-link" 
    :class="{ active: route.path === '/press' }"
  >PRESS</NuxtLink>

  <NuxtLink 
    to="/contact" 
    class="nav-link" 
    :class="{ active: route.path === '/contact' }"
  >CONTACT</NuxtLink>
</nav>

      <!-- Hamburger Icon (only when screen is small) -->
      <button v-if="isMobile" class="hamburger" @click="toggleMobileMenu" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Mobile Menu (slide in from right) -->
    <transition name="slide">
      <nav v-if="isMobile && mobileOpen" class="mobile-nav">
        <NuxtLink to="/about" class="mobile-link" @click="closeMobileMenu">ABOUT</NuxtLink>
        <NuxtLink to="/projects" class="mobile-link" @click="closeMobileMenu">WORK</NuxtLink>
        <NuxtLink to="/press" class="mobile-link" @click="closeMobileMenu">PRESS</NuxtLink>
        <NuxtLink to="/contact" class="mobile-link" @click="closeMobileMenu">CONTACT</NuxtLink>
      </nav>
    </transition>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, nextTick } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "NavBar",
  setup() {
    const route = useRoute();
    const open = ref(false);
    const mobileOpen = ref(false);
    const isMobile = ref(false);

    const toggleMobileMenu = () => {
      mobileOpen.value = !mobileOpen.value;
      if (mobileOpen.value) {
        nextTick(() => document.addEventListener("click", handleClickOutside));
      } else {
        document.removeEventListener("click", handleClickOutside);
      }
    };

    const closeMobileMenu = () => {
      mobileOpen.value = false;
      document.removeEventListener("click", handleClickOutside);
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".mobile-nav") && !target.closest(".hamburger")) {
        closeMobileMenu();
      }
    };

    const checkScreenSize = () => {
      isMobile.value = window.innerWidth <= 1024;
    };

    onMounted(() => {
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", checkScreenSize);
      document.removeEventListener("click", handleClickOutside);
    });

    return { open, mobileOpen, isMobile, toggleMobileMenu, closeMobileMenu, route };
  },
});
</script>



<style>
/* Base Navbar */
.navbar {
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: clamp(60px, 8vw, 100px);
}

.navbar-content {
  max-width: 1600px;
  margin: 0 auto;
  height: 100%;
  padding: 0 clamp(12px, 3vw, 32px);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

/* Logo */
.logo {
  height: clamp(28px, 6vw, 60px);
  width: auto;
  max-width: clamp(80px, 12vw, 140px);
  object-fit: contain;
  transition: height 0.3s ease, opacity 0.3s ease;
}
.logo:hover { opacity: 0.8; }

/* Brand Text */
.nav-brand-text {
  font-family: "proxima-nova", sans-serif;
  font-weight: 300;
  font-size: clamp(14px, 2vw, 20px);
  letter-spacing: 0.3em;
  color: #fff;
  justify-self: center;
}

/* Desktop Nav Links */
.nav {
  display: flex;
  gap: clamp(0.5rem, 2vw, 1.5rem);
  align-items: center;
  justify-self: end;
}

.nav-link {
  color: #fff;
  font-family: "proxima-nova", sans-serif;
  font-size: clamp(0.75rem, 1.5vw, 0.95rem);
  font-weight: 400;
  text-transform: uppercase;
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease, opacity 0.3s ease;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  right: 0;
  width: 0;
  height: 1px;
  background: #fff;
  opacity: 0.5;
  transition: width 0.3s ease;
}
.nav-link:hover::after { width: 100%; opacity: 1; }
.nav:hover .nav-link { opacity: 0.3; }
.nav-link:hover { opacity: 1 !important; }

/* Dropdown Menu */
.dropdown { position: relative; }
.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.75rem 1.25rem; /* more padding */
  gap: 1rem;                /* increased vertical spacing */
  min-width: 180px;         /* slightly wider */
}
.dropdown-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 100%;
  background: #ffffff33;
}
.dropdown-item {
  color: #fff;
  font-family: "proxima-nova", sans-serif;
  font-weight: 300;
  text-transform: uppercase;
  text-decoration: none;
  font-size: clamp(0.85rem, 1.3vw, 1rem); /* a bit smaller than navbar CTAs and mobile links */
  letter-spacing: 0.4px;
  transition: opacity 0.3s ease, color 0.3s ease;
}
.dropdown-list:hover .dropdown-item { opacity: 0.7; }
.dropdown-item:hover { opacity: 1 !important; color: #fff; }

/* Hamburger Icon (mobile only) */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 2001;
  justify-self: end;
}
.hamburger span {
  display: block;
  width: 20px;
  height: 1px;
  background: #fff;
  border-radius: 1px;
}

/* Mobile Nav */
.mobile-nav {
  position: fixed;
  top: 0;
  right: 0;
  width: clamp(150px, 60vw, 220px);
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  padding: clamp(60px, 10vh, 100px) clamp(16px, 4vw, 24px);
  gap: clamp(12px, 2vh, 20px);
  z-index: 2000;
}

.mobile-link {
  font-family: "proxima-nova", sans-serif;
  text-transform: uppercase;
  color: #fff;
  text-decoration: none;
  font-size: clamp(0.95rem, 2vw, 1.15rem); /* matches or just under navbar CTAs */
  letter-spacing: 0.07em;
  transition: color 0.3s ease, opacity 0.3s ease;
}
.mobile-nav:hover .mobile-link { opacity: 0.3; }
.mobile-link:hover { opacity: 1 !important; color: #fff !important; }

/* Slide Transition */
.slide-enter-from,
.slide-leave-to { transform: translateX(100%); opacity: 0; }
.slide-enter-active,
.slide-leave-active { transition: transform 0.3s ease, opacity 0.3s ease; }
.slide-enter-to,
.slide-leave-from { transform: translateX(0%); opacity: 1; }

/* Responsive: Hide Desktop on Tablets */
@media (max-width: 1024px) {
  .desktop-nav { display: none; }
  .hamburger { display: flex; }
}

/* Active CTA: white text + underline */
.nav-link.active {
  color: #fff;
}
.nav-link.active::after {
  width: 100%;
  opacity: 1;
}

/* Hover: only hovered CTA stays white */
.nav:hover .nav-link {
  opacity: 0.3;
  text-decoration: none;
}
.nav-link:hover {
  opacity: 1 !important;
}
.nav-link:hover::after {
  width: 100%;
  opacity: 1;
}
</style>