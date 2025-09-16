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
      <div class="nav-section">
        <img
          class="nav-brand"
          alt="Night IS y"
          src="https://c.animaapp.com/2lD2yyWL/img/night-is-y.png"
        />
        <nav class="nav">
          <NuxtLink to="/about" class="nav-link">
            <img alt="About" src="https://c.animaapp.com/GSAE547a/img/about.png" />
          </NuxtLink>
          <NuxtLink to="/work" class="nav-link">
            <img alt="Work" src="https://c.animaapp.com/GSAE547a/img/work.png" />
          </NuxtLink>
          <NuxtLink to="/press" class="nav-link">
            <img alt="Press" src="https://c.animaapp.com/GSAE547a/img/press.png" />
          </NuxtLink>
          <NuxtLink to="/contact" class="nav-link">
            <img alt="Contact" src="https://c.animaapp.com/GSAE547a/img/contact.png" />
          </NuxtLink>
        </nav>
      </div>
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
  height: 132px;
  left: 50%;
  position: absolute;
  top: 1px;
  width: 1728px;
  transform: translateX(-50%);
}

.navbar-content {
  height: 138px;
  left: 42px;
  position: relative;
  top: 39px;
  width: 1644px;
}

.logo {
  aspect-ratio: 0.89;
  height: 138px;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 123px;
}

.nav-section {
  height: 65px;
  left: 0;
  position: absolute;
  top: 4px;
  width: 1644px;
}

.nav-brand {
  height: 26px;
  left: 764px;
  position: absolute;
  top: 9px;
  width: 117px;
}

.nav {
  display: flex;
  gap: 20px;
  position: absolute;
  top: 11px;
}

.nav-link {
  height: 21px;
  position: absolute;
  top: 11px;
  display: flex;
  align-items: center;
}

.nav-link:nth-child(1) { /* About */
  left: 1241px;
  width: 68px;
}
.nav-link:nth-child(2) { /* Work */
  left: 1353px;
  width: 61px;
}
.nav-link:nth-child(3) { /* Press */
  left: 1461px;
  width: 62px;
}
.nav-link:nth-child(4) { /* Contact */
  left: 1555px;
  width: 90px;
}

.nav-link img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
</style>
