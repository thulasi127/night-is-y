<template>
  <div class="film-modal-overlay" @click.self="close">
    <div class="frame">
      <img class="image" :alt="film.title" :src="film.poster" />
      <div class="text-wrapper">{{ film.title }}</div>
      <button class="size-48" @click="close" aria-label="Close" style="background:none;border:none;position:absolute;top:43px;left:1495px;color:#F5F5F5;font-size:2rem;cursor:pointer;">×</button>
      <div class="element">{{ film.subtitle }}</div>
      <img v-if="film.gallery && film.gallery[1]" class="img" :alt="film.title" :src="film.gallery[1]" />
      <p class="div">{{ film.description }}</p>
      <p class="DIRECTOR-d-w">
        <span class="span">DIRECTOR | </span>
        <a :href="film.director.imdb" target="_blank" rel="noopener noreferrer">
          <span class="text-wrapper-2">{{ film.director.name }}</span>
        </a>
        <span class="span"> WRITERS | </span>
        <template v-for="(writer, i) in film.writers" :key="i">
          <a :href="writer.imdb" target="_blank" rel="noopener noreferrer">
            <span class="text-wrapper-2">{{ writer.name }}</span>
          </a>
          <span v-if="i < film.writers.length - 1">, </span>
        </template>
      </p>
      <img v-if="film.rectangle" class="rectangle" :alt="'Rectangle'" :src="film.rectangle" />
      <div class="awards-accolades">{{ film.awards }}</div>
      <!-- Add KeyboardArrowDown if you want -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "FilmModal",
  props: {
    film: { type: Object as PropType<any>, required: true },
    close: { type: Function as PropType<() => void>, required: true }
  }
});
</script>

<style scoped>
.film-modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.85);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.frame {
  background-color: #000000d9;
  height: 812px;
  position: relative;
  width: 1580px;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.6);
  overflow-y: auto;
}
.frame .image {
  aspect-ratio: 0.68;
  height: 782px;
  left: 68px;
  position: absolute;
  top: 15px;
  width: 528px;
}
.frame .text-wrapper {
  color: #ffffff;
  font-family: "Neue Montreal-Regular", Helvetica;
  font-size: 64px;
  font-weight: 400;
  left: 645px;
  letter-spacing: 0;
  line-height: 30px;
  position: absolute;
  top: 43px;
  white-space: nowrap;
  width: 541px;
}
.frame .size-48 {
  height: 30px !important;
  left: 1495px !important;
  position: absolute !important;
  top: 43px !important;
  width: 30px !important;
}
.frame .element {
  align-items: center;
  color: #ffffff;
  display: flex;
  font-family: "Neue Montreal-Regular", Helvetica;
  font-size: 18px;
  font-weight: 400;
  height: 15px;
  justify-content: center;
  left: 645px;
  letter-spacing: 0.08px;
  line-height: 15px;
  position: absolute;
  top: 100px;
  width: 352px;
}
.frame .img {
  aspect-ratio: 0.95;
  height: 21px;
  left: 790px;
  object-fit: cover;
  position: absolute;
  top: 97px;
  width: 20px;
}
.frame .div {
  color: #ffffff;
  font-family: "Neue Montreal-Regular", Helvetica;
  font-size: 16px;
  font-weight: 400;
  left: 645px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 137px;
  width: 838px;
}
.frame .DIRECTOR-d-w {
  color: #ffffff;
  font-family: "Neue Montreal-Regular", Helvetica;
  font-size: 16px;
  font-weight: 400;
  left: 645px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 207px;
  width: 365px;
}
.frame .span {
  color: #ffffff;
  font-family: "Neue Montreal-Regular", Helvetica;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0;
}
.frame .text-wrapper-2 {
  text-decoration: underline;
}
.frame .rectangle {
  height: 481px;
  left: 645px;
  position: absolute;
  top: 255px;
  width: 865px;
}
.frame .awards-accolades {
  align-items: center;
  color: #ffffff;
  display: flex;
  font-family: "Neue Montreal-Medium", Helvetica;
  font-size: 14px;
  font-weight: 500;
  height: 39px;
  justify-content: center;
  left: 984px;
  letter-spacing: 0.10px;
  line-height: 20px;
  position: absolute;
  text-align: center;
  top: 748px;
  width: 181px;
}
</style>