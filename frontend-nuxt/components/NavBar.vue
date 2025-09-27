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
        <NuxtLink to="/about" class="nav-link">ABOUT</NuxtLink>
        <div class="dropdown" @mouseenter="open = true" @mouseleave="open = false">
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

export default defineComponent({
  name: "NavBar",
  setup() {
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

    // Close menu if clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".mobile-nav") && !target.closest(".hamburger")) {
        closeMobileMenu();
      }
    };

    // Track screen size for responsive switching
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

    return { open, mobileOpen, isMobile, toggleMobileMenu, closeMobileMenu };
  },
});
</script>


<style>
/* Base Navbar */
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
  height: clamp(40px, 8vw, 80px);  /* Scales between 40px and 80px depending on screen size */
  width: auto;                     /* Keeps aspect ratio */
  max-width: 200px;                 /* Prevents it from growing too large on huge screens */
  object-fit: contain;
  transition: height 0.3s ease, opacity 0.3s ease;
}

@media (max-width: 768px) {
  .logo {
    height: clamp(30px, 10vw, 60px); /* Even smaller on mobile */
    max-width: 150px;
  }
  .mobile-link {
    font-size: clamp(1rem, 4vw, 1.2rem);
    letter-spacing: 0.1em;
  }
}
.logo:hover { opacity: 0.8; }

/* Center Text */
.nav-brand-text {
  font-family: "proxima-nova", sans-serif;
  font-weight: 300;
  font-size: clamp(18px, 2vw, 24px);
  letter-spacing: 0.41em;
  color: #fff;
  justify-self: center;
}

/* Desktop Nav Links */
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
  padding: 0.8rem 1.5rem;
  gap: 0.5rem;
  min-width: 180px;
}
.dropdown-line {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(1px);
  width: 1px;
  height: 100%;
  background: #ffffff33;
}
.dropdown-item {
  color: #ffffff;
  font-family: "proxima-nova", sans-serif;
  font-weight: 100;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  transition: opacity 0.3s ease, color 0.3s ease;
}
.dropdown-list:hover .dropdown-item { opacity: 0.7; }
.dropdown-item:hover { opacity: 1 !important; color: #ffffff; }

/* Hamburger Icon (only mobile) */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 2001;
  justify-self: end;
  margin-left: auto;
}
.hamburger span {
  display: block;
  width: 24px;
  height: 1px;
  background: #fff;
  border-radius: 1px;
}

/* Mobile Nav */
/* Mobile Nav Links */
.mobile-nav {
  position: fixed;
  top: 0;
  right: 0;
  width: 60vw;
  max-width: 260px;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 120px 24px 40px 24px;
  gap: 20px;
  z-index: 2000;
}

/* Mobile Links - Default */
.mobile-link {
  font-family: "proxima-nova", sans-serif;
  text-transform: uppercase;
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
  letter-spacing: 1px;
  transition: color 0.3s ease, opacity 0.3s ease;
}

/* Hover dim effect like desktop nav */
.mobile-nav:hover .mobile-link {
  opacity: 0.3;
}
.mobile-link:hover {
  opacity: 1 !important;
  color: #fff !important; /* keep text white */
}


/* Slide Transition */
.slide-enter-from,
.slide-leave-to { transform: translateX(100%); opacity: 0; }
.slide-enter-active,
.slide-leave-active { transition: transform 0.3s ease, opacity 0.3s ease; }
.slide-enter-to,
.slide-leave-from { transform: translateX(0%); opacity: 1; }

/* ---------- Desktop/Large Laptops ---------- */
@media (max-width: 1440px) {
  .nav-link {
    font-size: 0.9rem; /* slightly smaller text */
    gap: 1.5rem;
  }

  .logo {
    max-width: 160px; /* smaller logo */
  }
}

/* ---------- Tablets & Small Laptops ---------- */
@media (max-width: 1024px) {
  .desktop-nav {
    display: none; /* hide desktop menu */
  }

  .hamburger {
    display: flex;
  }

  .logo {
    max-width: 140px;
  }

  .nav-brand-text {
    font-size: clamp(16px, 2vw, 20px);
  }
}

/* ---------- Tablets Portrait Mode ---------- */
@media (max-width: 768px) {
  .mobile-nav {
    width: 60vw;
    max-width: 240px;
    padding: 80px 20px;
    gap: 16px;
  }

  .mobile-link {
    font-size: 1rem;
    letter-spacing: 0.05em;
    padding: 6px 0;
  }

  .logo {
    max-width: 120px;
  }
}

/* ---------- Small Phones ---------- */
@media (max-width: 430px) {
  .mobile-nav {
    width: 70vw;
    max-width: 200px;
    padding: 60px 16px;
    gap: 12px;
  }

  .mobile-link {
    font-size: 0.9rem;
    letter-spacing: 0.04em;
  }

  .logo {
    max-width: 100px;
  }

  .nav-brand-text {
    font-size: 14px;
    letter-spacing: 0.3em;
  }
}

</style>
