<template>
  <div class="film-modal-overlay" @click.self="close">
    <div class="frame">
      <!-- Close button -->
      <button class="close-modal-button" @click="close" aria-label="Close">×</button>
      <!-- Poster image -->
      <img v-if="film.poster" class="image" :alt="film.title" :src="film.poster" />
      <!-- Title -->
      <div class="text-wrapper">{{ film.title }}</div>
      <!-- Subtitle / year / duration / badge row -->
      <div class="element">
        {{ film.subtitle || (film.year ? film.year : '') }}
        <template v-if="film.isCertifiedFresh">
          • <img class="rotten-tomatoes" alt="Certified Fresh" src="https://c.animaapp.com/2hXfPSxK/img/image-20@2x.png" />
        </template>
      </div>
      <!-- Description -->
      <p class="div">{{ film.description }}</p>
      <!-- Director row -->
      <p class="director-info" v-if="film.director">
        <span class="span">DIRECTOR | </span>
        <a :href="film.director.imdb" target="_blank" rel="noopener">
          <span class="text-wrapper-2">{{ film.director.name }}</span>
        </a>
      </p>
      <!-- Writers row -->
      <p class="writers-info" v-if="film.writers && film.writers.length">
        <span class="span">WRITERS | </span>
        <template v-for="(writer, i) in film.writers" :key="i">
          <a :href="writer.imdb" target="_blank" rel="noopener">
            <span class="text-wrapper-2">{{ writer.name }}</span>
          </a>
          <span v-if="i < film.writers.length - 1" class="span"> • </span>
        </template>
      </p>
      <!-- Trailer iframe -->
      <iframe
        v-if="film.trailer"
        class="trailer-video"
        :src="film.trailer"
        title="Trailer"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <!-- Awards label -->
      <div class="awards-accolades">{{ film.awards }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilmModal",
  props: {
    film: { type: Object, required: true },
    close: { type: Function, required: true }
  }
};
</script>

<style scoped>
.film-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.frame {
  position: relative;
  width: 1580px;
  height: 812px;
  background: rgba(0, 0, 0, 0.85);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow-y: auto;
  font-family: "Neue Montreal-Regular", Helvetica, Arial, sans-serif;
}
.close-modal-button {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 5;
  background: none;
  border: none;
  color: #fff;
  width: 40px;
  height: 40px;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  border-radius: 999px;
  transition: transform .15s, opacity .15s, background-color .15s;
}
.close-modal-button:hover {
  transform: scale(1.06);
  opacity: .85;
  background-color: rgba(255,255,255,.06);
}
.image {
  aspect-ratio: 0.68;
  height: 400px;
  width: 272px;
  position: absolute;
  top: 20px;
  left: 40px;
  object-fit: cover;
  border-radius: 8px;
}
.text-wrapper {
  color: #fff;
  font-size: 48px;
  font-weight: 400;
  line-height: 52px;
  position: absolute;
  top: 20px;
  left: 340px;
  width: 500px;
  white-space: nowrap;
}
.element {
  position: absolute;
  top: 80px;
  left: 340px;
  width: 400px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #fff;
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  letter-spacing: 0.08px;
}
.rotten-tomatoes {
  width: 17px;
  height: 18px;
  aspect-ratio: 0.95;
  object-fit: cover;
  margin-left: 8px;
  vertical-align: middle;
}
.div {
  position: absolute;
  top: 120px;
  left: 340px;
  width: 800px;
  color: #fff;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  letter-spacing: 0;
  margin: 0;
}
.director-info {
  position: absolute;
  top: 220px;
  left: 340px;
  width: 600px;
  margin: 0;
  color: #fff;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
}
.writers-info {
  position: absolute;
  top: 250px;
  left: 340px;
  width: 600px;
  margin: 0;
  color: #fff;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
}
.span,
.text-wrapper-2 {
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0;
}
.text-wrapper-2 { text-decoration: none; }
.trailer-video {
  position: absolute;
  top: 290px;
  left: 340px;
  width: 800px;
  height: 400px;
  border: none;
  border-radius: 8px;
}
.awards-accolades {
  position: absolute;
  top: 700px;
  left: 650px;
  width: 181px;
  height: 39px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  letter-spacing: 0.1px;
}
</style>
