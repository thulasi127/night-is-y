<template>
  <div class="film-modal-overlay" @click.self="close">
    <div class="frame" role="dialog" aria-modal="true">
      <!-- Close -->
      <button class="close-modal-button" @click="close" aria-label="Close">×</button>

      <!-- Poster image -->
      <img v-if="film.poster" class="image" :alt="film.title" :src="film.poster" />

      <!-- Scrollable right-side content -->
      <div class="modal-scrollable-content">
        <div class="text-wrapper">{{ film.title }}</div>

        <!-- Subtitle row -->
        <div class="film-subtitle-row">
          <span>{{ film.year }}</span>
          <span class="dot">•</span>
          <span>{{ film.duration }}</span>
          <template v-if="film.isCertifiedFresh">
            <span class="dot">•</span>
            <img class="rotten-tomatoes" alt="Certified Fresh" src="https://c.animaapp.com/2hXfPSxK/img/image-20@2x.png" />
          </template>
        </div>

        <p class="div">{{ film.description }}</p>

        <!-- Grouped info rows -->
        <div class="info-labels">
          <span v-if="film.director">
            <span class="label-title">DIRECTOR | </span>
            <a :href="film.director.imdb" target="_blank" rel="noopener">
              <span class="label-link">{{ film.director.name }}</span>
            </a>
          </span>
          <span v-if="film.writers && film.writers.length">
            <span class="label-title"> WRITERS | </span>
            <template v-for="(writer, i) in film.writers" :key="i">
              <a v-if="writer.imdb" :href="writer.imdb" target="_blank" rel="noopener">
                <span class="label-link">{{ writer.name }}</span>
              </a>
              <span v-else class="label-link">{{ writer.name }}</span>
              <span v-if="i < film.writers.length - 1" class="dot">•</span>
            </template>
          </span>
          <span v-if="film.starring && film.starring.length">
            <span class="label-title"> STARRING | </span>
            <template v-for="(actor, i) in film.starring" :key="i">
              <a v-if="actor.imdb" :href="actor.imdb" target="_blank" rel="noopener">
                <span class="label-link">{{ actor.name }}</span>
              </a>
              <span v-else class="label-link">{{ actor.name }}</span>
              <span v-if="i < film.starring.length - 1" class="dot">•</span>
            </template>
          </span>
          <span v-if="film.executiveProducers && film.executiveProducers.length">
            <span class="label-title"> EXECUTIVE PRODUCER | </span>
            <template v-for="(ep, i) in film.executiveProducers" :key="i">
              <a v-if="ep.imdb" :href="ep.imdb" target="_blank" rel="noopener">
                <span class="label-link">{{ ep.name }}</span>
              </a>
              <span v-else class="label-link">{{ ep.name }}</span>
              <span v-if="i < film.executiveProducers.length - 1" class="dot">•</span>
            </template>
          </span>
        </div>

        <iframe
          v-if="film.trailer"
          class="trailer-video"
          :src="film.trailer"
          title="Trailer"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>

        <div class="awards-accolades">{{ film.awards }}</div>
      </div>
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
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  display: flex;
  font-family: "Neue Montreal-Regular", Helvetica, Arial, sans-serif;
  overflow: hidden;
}
.image {
  width: 272px;
  height: 400px;
  margin-top: 20px;
  margin-left: 40px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
  align-self: flex-start;
}
.modal-scrollable-content {
  margin-left: 40px;
  margin-top: 0;
  width: 1200px;
  height: 772px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding-top: 32px;
}
.text-wrapper {
  font-size: 48px;
  font-weight: 400;
  color: #fff;
  margin-bottom: 8px;
  max-width: 100%;
  white-space: normal;
  word-break: break-word;
  overflow: visible;
}
.div {
  font-size: 16px;
  color: #fff;
  margin-bottom: 8px;
  line-height: 24px;
}
.trailer-video {
  width: 800px;
  height: 400px;
  border-radius: 8px;
  margin-bottom: 8px;
  border: none;
}
.awards-accolades {
  font-size: 14px;
  color: #fff;
  margin-bottom: 8px;
  text-align: center;
}
.film-subtitle-row,
.director-info,
.writers-info,
.starring-info,
.execs-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 16px;
  line-height: 24px;
  color: #fff;
  font-weight: 400;
  margin-bottom: 8px;
}
.span,
.text-wrapper-2 {
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0;
}
.text-wrapper-2 { text-decoration: none; }
.dot {
  margin: 0 6px;
  font-size: 14px;
  color: #fff;
  font-weight: 400;
  line-height: 1;
  display: inline-block;
}
.rotten-tomatoes {
  width: 17px;
  height: 18px;
  aspect-ratio: 0.95;
  object-fit: cover;
  vertical-align: middle;
  display: block;
  margin-left: 0;
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
.info-labels {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.label-title {
  color: #fff;
  font-size: 16px;
  font-weight: 400;
}
.label-link {
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  text-decoration: none;
}
.label-dot {
  color: #fff;
  font-size: 14px;
  line-height: 1;
}
</style>