<template>
  <div class="film-modal-overlay" @click.self="close">
    <div class="frame" data-model-id="115:599">
      <img
        class="image"
        :alt="film.title"
        :src="film.poster"
      />
      <div class="text-wrapper">{{ film.title }}</div>
      <X
        className="x-instance"
        img="https://c.animaapp.com/2hXfPSxK/img/x.svg"
        size="forty-eight"
        @click="close"
        style="cursor:pointer;"
      />
      <div class="element">
        {{ film.subtitle }}
        <template v-if="film.isCertifiedFresh">
          • <img class="rotten-tomatoes" alt="Certified Fresh" src="https://c.animaapp.com/2hXfPSxK/img/image-20@2x.png" />
        </template>
      </div>
      <p class="div">{{ film.description }}</p>
      <p class="director-info">
        <span class="span">DIRECTOR | </span>
        <a
          :href="film.director.imdb"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span class="text-wrapper-2">{{ film.director.name }}</span>
        </a>
      </p>
      <p class="writers-info">
        <span class="span">WRITERS | </span>
        <template v-for="(writer, i) in film.writers" :key="i">
          <a
            :href="writer.imdb"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span class="text-wrapper-2">{{ writer.name }}</span>
          </a>
          <span v-if="i < film.writers.length - 1" class="span"> • </span>
        </template>
      </p>
      <iframe
        class="trailer-video"
        :src="film.trailer"
        title="Trailer"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div class="awards-accolades">{{ film.awards }}</div>
      <KeyboardArrowDown
        className="keyboard-arrow-down-instance"
        keyboardArrowDown="https://c.animaapp.com/2hXfPSxK/img/keyboard-arrow-down-1.svg"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import KeyboardArrowDown from "./KeyboardArrowDown.vue";
import X from "./X.vue";

export default defineComponent({
  name: "FilmModal",
  components: {
    KeyboardArrowDown,
    X,
  },
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
  background-color: rgba(0, 0, 0, 0.85);
  height: 812px;
  position: relative;
  width: 1580px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
}

.frame .image {
  aspect-ratio: 0.68;
  height: 400px;
  left: 40px;
  position: absolute;
  top: 20px;
  width: 272px;
  object-fit: cover;
}

.frame .text-wrapper {
  color: #ffffff;
  font-family: "Neue Montreal-Regular", Helvetica;
  font-size: 48px;
  font-weight: 400;
  left: 340px;
  letter-spacing: 0;
  line-height: 52px;
  position: absolute;
  top: 20px;
  white-space: nowrap;
  width: 500px;
}

.frame .x-instance {
  height: 30px !important;
  left: 1520px !important;
  top: 20px !important;
  width: 30px !important;
}

.frame .element {
  align-items: center;
  color: #ffffff;
  display: flex;
  font-family: "Neue Montreal-Regular", Helvetica;
  font-size: 16px;
  font-weight: 400;
  height: 20px;
  justify-content: flex-start;
  left: 340px;
  letter-spacing: 0.08px;
  line-height: 20px;
  position: absolute;
  top: 80px;
  width: 400px;
}

.frame .rotten-tomatoes {
  aspect-ratio: 0.95;
  height: 18px;
  object-fit: cover;
  width: 17px;
  margin-left: 8px;
  vertical-align: middle;
}

.frame .div {
  color: #ffffff;
  font-family: "Neue Montreal-Regular", Helvetica;
  font-size: 16px;
  font-weight: 400;
  left: 340px;
  letter-spacing: 0;
  line-height: 24px;
  position: absolute;
  top: 120px;
  width: 800px;
}

.frame .director-info {
  color: #ffffff;
  font-family: "Neue Montreal-Regular", Helvetica;
  font-size: 16px;
  font-weight: 400;
  left: 340px;
  letter-spacing: 0;
  line-height: 24px;
  position: absolute;
  top: 220px;
  width: 600px;
  margin: 0;
}

.frame .writers-info {
  color: #ffffff;
  font-family: "Neue Montreal-Regular", Helvetica;
  font-size: 16px;
  font-weight: 400;
  left: 340px;
  letter-spacing: 0;
  line-height: 24px;
  position: absolute;
  top: 250px;
  width: 600px;
  margin: 0;
}

.frame .span {
  color: #ffffff;
  font-family: "Neue Montreal-Regular", Helvetica;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0;
}

.frame .text-wrapper-2 {
  color: #ffffff;
  font-family: "Neue Montreal-Regular", Helvetica;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0;
  text-decoration: none;
}

.frame .trailer-video {
  height: 400px;
  left: 340px;
  position: absolute;
  top: 290px;
  width: 800px;
  border: none;
  border-radius: 8px;
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
  left: 650px;
  letter-spacing: 0.10px;
  line-height: 20px;
  position: absolute;
  text-align: center;
  top: 700px;
  width: 181px;
}

.frame .keyboard-arrow-down-instance {
  left: 740px !important;
  top: 720px !important;
}
</style>
