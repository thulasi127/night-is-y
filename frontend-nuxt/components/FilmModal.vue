<template>
  <div class="film-modal-overlay" @click.self="close">
    <div class="frame">
      <!-- Close button -->
      <button class="close-modal-button" @click="close" aria-label="Close">×</button>

      <!-- Poster image -->
      <img v-if="film.poster" class="image" :alt="film.title" :src="film.poster" />

      <!-- Scrollable right-side content -->
      <div class="modal-scrollable-content">
        <div class="text-wrapper">{{ film.title }}</div>

        <div class="element">
          {{ film.subtitle || (film.year ? film.year : '') }}
          <template v-if="film.isCertifiedFresh">
            • <img class="rotten-tomatoes" alt="Certified Fresh" src="https://c.animaapp.com/2hXfPSxK/img/image-20@2x.png" />
          </template>
        </div>

        <p class="div">{{ film.description }}</p>

        <p class="director-info" v-if="film.director">
          <span class="span">DIRECTOR | </span>
          <a :href="film.director.imdb" target="_blank" rel="noopener">
            <span class="text-wrapper-2">{{ film.director.name }}</span>
          </a>
        </p>

        <p class="writers-info" v-if="film.writers && film.writers.length">
          <span class="span">WRITERS | </span>
          <template v-for="(writer, i) in film.writers" :key="i">
            <a :href="writer.imdb" target="_blank" rel="noopener">
              <span class="text-wrapper-2">{{ writer.name }}</span>
            </a>
            <span v-if="i < film.writers.length - 1" class="span"> • </span>
          </template>
        </p>

        <!-- Starring row -->
        <p class="starring-info" v-if="film.starring?.length">
          <span class="span">STARRING | </span>
          <template v-for="(actor, i) in film.starring" :key="i">
            <a v-if="actor.imdb" :href="actor.imdb" target="_blank" rel="noopener">
              <span class="text-wrapper-2">{{ actor.name }}</span>
            </a>
            <span v-else class="text-wrapper-2">{{ actor.name }}</span>
            <span v-if="i < film.starring.length - 1" class="span"> • </span>
          </template>
        </p>

        <!-- Executive Producer row -->
        <p class="execs-info" v-if="film.executiveProducers?.length">
          <span class="span">EXECUTIVE PRODUCER | </span>
          <template v-for="(ep, i) in film.executiveProducers" :key="i">
            <a v-if="ep.imdb" :href="ep.imdb" target="_blank" rel="noopener">
              <span class="text-wrapper-2">{{ ep.name }}</span>
            </a>
            <span v-else class="text-wrapper-2">{{ ep.name }}</span>
            <span v-if="i < film.executiveProducers.length - 1" class="span"> • </span>
          </template>
        </p>

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

/* Poster stays fixed left */
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

/* Scrollable right content */
.modal-scrollable-content {
  margin-left: 40px;
  margin-top: 20px;
  width: 1200px;
  height: 772px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* Remove absolute positioning from these: */
.text-wrapper,
.element,
.div,
.director-info,
.writers-info,
.trailer-video,
.awards-accolades,
.starring-info,
.execs-info  {
  position: static !important;
  width: auto;
  left: unset;
  top: unset;
  margin: 0;
  color:#fff;
  font-size:16px;
  line-height:24px;
  font-weight:400;
  margin:0;
}

/* Spacing and font for each section */
.text-wrapper { font-size: 48px; font-weight: 400; color: #fff; margin-bottom: 8px; }
.element { font-size: 16px; color: #fff; margin-bottom: 8px; display: flex; align-items: center; }
.div { font-size: 16px; color: #fff; margin-bottom: 8px; line-height: 24px; }
.director-info, .writers-info { font-size: 16px; color: #fff; margin-bottom: 8px; }
.trailer-video { width: 800px; height: 400px; border-radius: 8px; margin-bottom: 8px; border: none; }
.awards-accolades { font-size: 14px; color: #fff; margin-bottom: 8px; text-align: center; }

/* Certified Fresh icon */
.rotten-tomatoes {
  width: 17px;
  height: 18px;
  aspect-ratio: 0.95;
  object-fit: cover;
  margin-left: 8px;
  vertical-align: middle;
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
</style>
