<template>
  <transition name="modal-fade">
    <div class="film-modal-overlay" @click.self="close">
      <div class="frame" role="dialog" aria-modal="true">
        <!-- Close -->
        <button class="close-modal-button" @click="close" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 20 20" stroke="#fff" stroke-width="1.5" fill="none" stroke-linecap="round">
            <line x1="5" y1="5" x2="15" y2="15"/>
            <line x1="15" y1="5" x2="5" y2="15"/>
          </svg>
        </button>

        <!-- Poster image -->
        <img v-if="film.poster" class="image" :alt="film.title" :src="film.poster" />

        <!-- Scrollable right-side content -->
        <div class="modal-scrollable-content">
          <div class="text-wrapper">{{ film.title }}</div>

          <!-- Subtitle row: balanced spacing using flex and consistent dot margins -->
          <div class="film-subtitle-row">
            <span>{{ film.year }}</span>
            <span class="dot">&#183;</span>
            <span>{{ film.duration }}</span>
            <template v-if="film.isCertifiedFresh">
              <span class="dot">&#183;</span>
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
                <span v-if="i < film.writers.length - 1" class="dot">&#183;</span>
              </template>
            </span>
            <span v-if="film.starring && film.starring.length">
              <span class="label-title"> STARRING | </span>
              <template v-for="(actor, i) in film.starring" :key="i">
                <a v-if="actor.imdb" :href="actor.imdb" target="_blank" rel="noopener">
                  <span class="label-link">{{ actor.name }}</span>
                </a>
                <span v-else class="label-link">{{ actor.name }}</span>
                <span v-if="i < film.starring.length - 1" class="dot">&#183;</span>
              </template>
            </span>
            <span v-if="film.executiveProducers && film.executiveProducers.length">
              <span class="label-title"> EXECUTIVE PRODUCER | </span>
              <template v-for="(ep, i) in film.executiveProducers" :key="i">
                <a v-if="ep.imdb" :href="ep.imdb" target="_blank" rel="noopener">
                  <span class="label-link">{{ ep.name }}</span>
                </a>
                <span v-else class="label-link">{{ ep.name }}</span>
                <span v-if="i < film.executiveProducers.length - 1" class="dot">&#183;</span>
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
  </transition>
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
@font-face {
  font-family: 'Neue Montreal';
  src: url('/fonts/NeueMontreal-Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
}

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
  font-family: "Neue Montreal", Helvetica, Arial, sans-serif;
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
  font-family: 'Neue Montreal', Helvetica, Arial, sans-serif;
  font-size: 64px;
  font-weight: 400;
  color: #fff;
  text-transform: uppercase;
  line-height: 70px;
  margin-bottom: 2px;
  max-width: 100%;
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
.film-subtitle-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-family: 'Neue Montreal', Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 22px;
  color: #e0e0e0;
  font-weight: 400;
  margin-bottom: 10px;
}

.dot {
  margin: 0 6px;
  font-size: 16px;
  color: #e0e0e0;
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
  display: inline-block;
  margin: 0 6px;
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
  background-color: transparent;
}
.close-modal-button:hover svg {
  filter: brightness(0.7); /* icon dims on hover */
  transition: filter 0.15s;
}
.info-labels {
  display: flex;
  flex-direction: column;
  gap: 2px; /* minimal vertical spacing between rows */
  margin-bottom: 12px;
}
.label-title {
  font-family: 'Neue Montreal', Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
}
.label-link {
  font-family: 'Neue Montreal', Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  text-decoration: underline;
}

/* Transition styles for modal fade */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 1.3s cubic-bezier(.4,0,.2,1);
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
}

.projects-cta-button,
.projects-cta-button * {
  transition: filter 0.15s;
}

.projects-cta-button:hover,
.projects-cta-button:hover * {
  filter: brightness(0.7); /* dims text and icon together on hover */
}
</style>