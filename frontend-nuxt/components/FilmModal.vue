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
          <div class="film-title-row">
            <div class="text-wrapper">{{ film.title }}</div>
            <div v-if="film.laurels && film.laurels.length" class="laurels-row">
              <img
                v-for="laurel in orderedLaurels"
                :key="laurel.name"
                :src="laurel.img"
                :alt="laurel.name"
                class="laurel-img"
              />
            </div>
          </div>

          <!-- Subtitle row: balanced spacing using flex and consistent dot margins -->
          <div class="film-subtitle-row">
            <span>{{ film.year }}</span>
            <span class="dot">&#183;</span>
            <span>{{ film.duration }}</span>
          </div>

          <div class="div">
            <p v-for="(para, i) in film.description.split('\n\n')" :key="i">{{ para }}</p>
          </div>

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

          <div
            v-if="film.awardsAndNominations && film.awardsAndNominations.length"
            class="awards-section"
          >
            <h2 class="awards-title">
              AWARDS <span class="dot">&#183;</span> {{ film.awardsAndNominations.length }} NOMINATIONS
            </h2>
            <transition-group name="fade-stagger" tag="div" class="awards-list">
              <div
                v-for="(award, i) in film.awardsAndNominations"
                :key="i"
                class="award-row"
                :class="{ winner: award.status === 'Winner' }"
              >
                <div class="award-row-main">
                  <div class="award-left">
                    <span class="award-year-status">
                      {{ award.year }} {{ award.status.toUpperCase() }}
                    </span>
                  </div>
                  <div class="award-middle">
                    <span
                      class="award-name"
                      :class="{ clickable: award.link }"
                      v-if="award.link"
                    >
                      <a :href="award.link" target="_blank" rel="noopener">{{ award.award }}</a>
                    </span>
                    <span v-else class="award-name">{{ award.award }}</span>
                    <div class="award-category">{{ award.category }}</div>
                  </div>
                </div>
                <div v-if="award.festival || award.notes" class="award-extra">
                  <span v-if="award.festival">{{ award.festival }}</span>
                  <span v-if="award.notes">{{ award.notes }}</span>
                </div>
                <div class="award-divider"></div>
              </div>
            </transition-group>
          </div>

          <div v-if="film.articles && film.articles.length" class="article-list-section">
            <h2 class="section-heading">ARTICLES</h2>
            <ul class="article-list">
              <li v-for="(article, i) in film.articles" :key="i">
                <span class="bullet">&#8226;</span>
                <span class="article-title">{{ article.title.toUpperCase() }}</span>
              </li>
            </ul>
          </div>
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
  },
  computed: {
    orderedLaurels() {
      if (!this.film.laurels) return [];
      const order = ["tiff", "SXSW", "Rotten Tomatoes"];
      // Map to ordered laurels, filter out undefined
      return order
        .map(name => this.film.laurels.find(l => l.name && l.name.toLowerCase() === name.toLowerCase()))
        .filter(l => l && l.shouldDisplay);
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: "proxima-nova", sans-serif;
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
  font-family: "proxima-nova", sans-serif;
  overflow: hidden;
  align-items: center; /* Vertically center poster and content */
}

.image {
  width: 272px;
  height: 400px;
  margin-top: 0;
  margin-left: 40px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
  align-self: center;
  /* Poster remains fixed size regardless of content */
}

.modal-scrollable-content {
  margin-left: 40px;
  margin-top: 0;
  width: 1200px;
  height: 772px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 24px;
  padding-right: 24px;
  /* Text flows naturally next to fixed poster */
}

/* Section titles: consistent margin below */
.section-heading,
.awards-title {
  margin-bottom: 12px;    /* Consistent margin below section titles */
}

/* Reduce gaps between description, credits, trailer */
.div {
  margin-bottom: 10px;    /* Slightly tighter spacing below description */
}

.info-labels {
  margin-bottom: 10px;    /* Tighter spacing below credits */
}

.trailer-video {
  margin-top: 10px;
  margin-bottom: 10px;    /* Add margin below trailer for separation */
}

/* Awards and articles sections: reduce vertical gap */
.awards-section,
.article-list-section {
  margin-top: 18px;       /* Slightly reduced top margin */
  margin-bottom: 10px;    /* Consistent bottom margin */
}

.film-title-row {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 2px;
}

.text-wrapper {
  font-family: "Anton", sans-serif;
  font-size: 44px;
  font-weight: 700;           /* Boldest for title */
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  line-height: 1.08;
  max-width: 100%;
  word-break: break-word;
  margin-bottom: 2px;
}

.laurel-img {
  height: 44px; /* Increased from 32px for better visibility */
  width: auto;
  object-fit: contain;
}

.laurels-row {
  display: flex;
  gap: 16px; /* slightly bigger gap for breathing room */
  align-items: center;
  margin-top: 2px; /* subtle alignment tweak */
}

/* Tablet screens */
@media (max-width: 1024px) {
  .laurel-img {
    height: 32px; /* slightly smaller for tablets */
  }
}

/* Mobile screens */
@media (max-width: 640px) {
  .laurel-img {
    height: 26px; /* smaller for mobile */
    margin-bottom: 4px; /* give some breathing room if wrapped */
  }
  .laurels-row {
    justify-content: flex-start; /* align to left if wrapping */
  }
}

.film-subtitle-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-family: "proxima-nova", sans-serif;
  font-size: 15px;
  line-height: 1.5;
  color: #e0e0e0;
  font-weight: 400;
  margin-bottom: 8px;
}

.div {
  font-size: 15px;       /* Slightly smaller */
  color: #fff;
  margin-bottom: 10px;    /* Slightly tighter spacing below description */
  line-height: 22px;
}

.section-heading,
.awards-title {
  font-size: 15px;       /* Tighter heading size */
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #fff;
  font-family: "proxima-nova", sans-serif;
  margin-bottom: 12px;    /* Consistent margin below section titles */
}

.trailer-video {
  width: 100%;
  max-width: 520px;           /* Slightly smaller trailer */
  aspect-ratio: 16 / 9;
  height: auto;
  border-radius: 6px;
  margin-top: 10px;
  margin-bottom: 10px;    /* Add margin below trailer for separation */
  background: #000;
  align-self: flex-start; /* keeps it aligned with text column */
}

@media (max-width: 1000px) {
  .frame {
    width: 98vw;
    height: auto;
    flex-direction: column;
    align-items: flex-start;
  }
  .image {
    margin-left: 0;
    margin-top: 24px;
    align-self: flex-start;
  }
  .modal-scrollable-content {
    margin-left: 0;
    width: 100%;
    padding-right: 0;
    padding-top: 16px;
  }
  .trailer-video {
    max-width: 100%;
    margin-top: 8px;
  }
  .text-wrapper {
    font-size: 32px;
  }
}

.awards-title .dot {
  margin: 0 6px;
  font-size: 14px;
  color: #e0e0e0;
  vertical-align: middle;
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
  margin-bottom: 10px;    /* Tighter spacing below credits */
}
.label-title {
  font-family: "proxima-nova", sans-serif;
  font-size: 15px;
  font-variant: small-caps;
  font-weight: 500;           /* Medium for labels */
  color: #fff;
  letter-spacing: 0.5px;
}
.label-link {
  font-family: "proxima-nova", sans-serif;
  font-size: 15px;
  font-weight: 400;           /* Regular for content */
  color: #fff;
  text-decoration: none;
  transition: color 0.15s, text-decoration 0.15s;
}
.label-link:hover,
.label-link:focus {
  text-decoration: underline;
  color: #593792;
}

.awards-section {
  margin-top: 24px;
  margin-bottom: 10px;    /* Consistent bottom margin */
  font-family: "proxima-nova", sans-serif;
}

.awards-title {
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.awards-title .dot {
  margin: 0 6px;
  font-size: 14px;
  color: #e0e0e0;
  vertical-align: middle;
}

.awards-list {
  display: flex;
  flex-direction: column;
  gap: 0; /* Minimal spacing for a cleaner stack */
  margin-bottom: 0; /* Remove extra space below awards */
}

.award-row {
  padding: 8px 0 4px 0; /* Reduce vertical padding for tighter stack */
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  transition: background 0.2s;
}

.award-divider {
  height: 1px;
  background: linear-gradient(90deg, #444 0%, #222 100%);
  opacity: 0.5;
  margin: 8px 0 0 0;
  border: none;
  transition: background 0.2s;
}

.award-row:hover .award-divider {
  background: #593792; /* underline color on hover */
  opacity: 1;
}

.award-row-main {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  flex-wrap: wrap;
}

.award-left {
  min-width: 110px;
  font-size: 14px;
  color: #e0e0e0;
  font-variant: small-caps;
  font-weight: 400;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
}

.award-year-status {
  font-size: 14px;
  color: #e0e0e0;
  font-variant: small-caps;
  font-weight: 400;
  letter-spacing: 0.5px;
}

.award-trophy {
  margin-left: 6px;
  font-size: 16px;
  vertical-align: middle;
}

.award-middle {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.award-name {
  font-size: 16px;
  font-weight: 500;           /* Medium for award names */
  color: #fff;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
  text-decoration: none;
  transition: color 0.15s, text-decoration 0.15s;
}
.award-name.clickable a {
  color: #fff;
  text-decoration: none;
  transition: color 0.15s, text-decoration 0.15s;
}
.award-name.clickable a:hover,
.award-name.clickable a:focus {
  text-decoration: underline;
  color: #593792;
}

.award-category {
  font-size: 14px;
  color: #e0e0e0;
  font-weight: 400;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
}

.award-extra {
  font-size: 13px;
  color: #bdbdbd;
  margin-top: 2px;
  margin-left: 134px;
}

.award-divider {
  height: 1px;
  background: linear-gradient(90deg, #444 0%, #222 100%);
  opacity: 0.5;
  margin: 8px 0 0 0;
  border: none;
}

.article-list-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 600px;
}

.section-heading {
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 1px;
  color: #fff;
  font-family: "proxima-nova", sans-serif;
}

.article-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.article-list li {
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 16px;
  font-family: "proxima-nova", sans-serif;
  text-transform: uppercase;
  line-height: 24px;
  transition: color 0.15s, filter 0.15s;
}

.bullet {
  margin-right: 8px;
  font-size: 18px;
}

.article-title {
  font-style: italic;
  transition: color 0.15s, filter 0.15s;
}

.article-title:hover,
.article-link:hover,
.article-link:focus {
  filter: brightness(1) !important; /* override CTA dimming, keep full brightness */
  color: #593792;
  cursor: pointer;
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

/* Fade-in stagger animation for rows */
.fade-stagger-enter-active {
  transition: all 0.3s cubic-bezier(.4,0,.2,1);
}
.fade-stagger-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.fade-stagger-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-stagger-leave-active {
  transition: all 0.2s cubic-bezier(.4,0,.2,1);
}
.fade-stagger-leave-to {
  opacity: 0;
  transform: translateY(-12px);
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