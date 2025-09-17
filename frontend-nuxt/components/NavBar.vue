<template>
  <header class="navbar">
    <div class="navbar-content">
      <NuxtLink to="/home">
        <img
          class="logo"
          alt="Night IS y"
          src="https://c.animaapp.com/2lD2yyWL/img/image-6@2x.png"
        />
      </NuxtLink>
      
      <img
        class="nav-brand"
        alt="Night IS y"
        src="https://c.animaapp.com/2lD2yyWL/img/night-is-y.png"
      />
      
      <nav class="nav">
        <NuxtLink to="/about" class="nav-link">About</NuxtLink>
        <NuxtLink to="/projects" class="nav-link">Work</NuxtLink>
        <NuxtLink to="/press" class="nav-link">Press</NuxtLink>
        <NuxtLink to="/contact" class="nav-link">Contact</NuxtLink>
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

.nav-brand {
  height: 28px;
  width: auto;
  object-fit: contain;
  justify-self: center;
}

.nav {
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-self: end;
}

.nav-link {
  color: #ffffff;
  font-family: "Neue Montreal-Regular", Helvetica;
  font-size: 1rem;
  font-weight: 400;
  text-decoration: none;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: #cccccc;
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

/* Mobile adjustments */
@media (max-width: 768px) {
  .navbar {
    height: 80px;
  }
  
  .navbar-content {
    padding: 0 1rem;
    grid-template-columns: auto 1fr auto;
    gap: 1rem;
  }
  
  .logo {
    height: clamp(40px, 8vh, 50px);
  }
  
  .nav {
    gap: clamp(0.5rem, 2vw, 1rem);
  }
  
  .nav-link {
    font-size: clamp(0.8rem, 2.2vw, 0.9rem);
  }
  
  .nav-brand {
    height: clamp(16px, 4vh, 20px);
  }
}

/* Very small screens (landscape phones) */
@media (max-height: 500px) {
  .navbar {
    height: 60px;
  }
  
  .logo {
    height: clamp(30px, 6vh, 40px);
  }
  
  .nav-brand {
    height: clamp(12px, 3vh, 16px);
  }
  
  .nav-link {
    font-size: clamp(0.7rem, 2vw, 0.8rem);
  }
}

/* Tablet landscape */
@media (min-width: 769px) and (max-width: 1024px) and (orientation: landscape) {
  .navbar {
    height: clamp(80px, 10vh, 100px);
  }
  
  .logo {
    height: clamp(50px, 8vh, 70px);
  }
  
  .nav-brand {
    height: clamp(20px, 4vh, 25px);
  }
}
</style>
