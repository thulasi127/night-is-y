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
        <div class="modal-scrollable-content" ref="scrollableContent">
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
            <span>{{ film.duration?.toLowerCase() }}</span>
          </div>

          <div class="div">
            <p v-for="(para, i) in film.description.split('\n\n')" :key="i">{{ para }}</p>
          </div>

          <!-- Grouped info rows -->
          <div v-if="film.credits && film.credits.length" class="info-labels">
  <div
    v-for="(credit, i) in film.credits"
    :key="i"
  >
    <span class="label-title">
      {{ credit.role.toUpperCase() }} |
    </span>

    <template
      v-for="(person, j) in credit.people"
      :key="j"
    >
      <a
        v-if="person.imdb"
        :href="person.imdb"
        target="_blank"
        rel="noopener"
        class="label-link"
      >
        {{ toTitleCase(person.name) }}
      </a>
      <span
        v-else
        class="label-link no-hover"
      >
        {{ toTitleCase(person.name) }}
      </span>

      <span
        v-if="j < credit.people.length - 1"
        class="dot"
      >
        &#183;
      </span>
    </template>
  </div>
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
              AWARDS <span class="dot">&#183;</span> 
              {{ film.awardsAndNominations.length }} 
              {{ film.awardsAndNominations.length === 1 ? 'NOMINATION' : 'NOMINATIONS' }}
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
    <li
      v-for="(article, i) in film.articles"
      :key="i"
      class="article-item"
    >
      <span class="article-bullet"></span>

      <a
        :href="article.link"
        target="_blank"
        rel="noopener"
        class="article-link"
      >
        {{ article.title.toUpperCase() }}
      </a>
    </li>
  </ul>
</div>

          <!-- Scroll Indicator -->
          <div
            v-if="showScrollIndicator"
            class="scroll-indicator"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
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
  data() {
    return {
      showScrollIndicator: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      const content = this.$refs.scrollableContent;
      if (content && content.scrollHeight > content.clientHeight) {
        this.showScrollIndicator = true;
        content.addEventListener("scroll", this.handleScroll);
      }
    });
  },
  beforeUnmount() {
    const content = this.$refs.scrollableContent;
    if (content) content.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
  handleScroll(e) {
    if (e.target.scrollTop > 10) this.showScrollIndicator = false;
  },

  toTitleCase(str) {
    if (!str) return ''
    return str
      .toLowerCase()
      .replace(/\b\w/g, char => char.toUpperCase())
  }
}
,
  computed: {
    orderedLaurels() {
      if (!this.film.laurels) return [];
      const order = ["tiff", "SXSW", "Rotten Tomatoes"];
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
  overflow: auto;
}
.frame {
  position: relative;
  width: clamp(320px, 80vw, 1200px);
  height: clamp(400px, 80vh, 800px);
  background: rgba(0, 0, 0, 0.85);
  border-radius: 0px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  display: flex;
  font-family: "proxima-nova", sans-serif;
  overflow: visible;
  align-items: flex-start;
  @include spacing(padding, "lg");
}

.image {
  width: 340px;  /* 25% larger */
  height: 500px;
  margin-top: 40px;  /* creates a bit of offset from top padding */
  margin-left: 40px;
  object-fit: cover;
  border-radius: 0px;
  flex-shrink: 0;
  align-self: center;
  /* Poster remains fixed size regardless of content */
}

.modal-scrollable-content {
  margin-left: 40px;
  margin-top: 40px; /* aligns with poster top visually */
  height: auto;
  width: 1200px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;       /* tighter grouping */
  padding-top: 0; /* keep flush with poster top */
  padding-right: 24px;
  padding-bottom: 80px;
  max-height: calc(80vh - 80px);
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
  margin-top: 6px;
  margin-bottom: 6px;
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
  font-size: clamp(1.8rem, 2.9vw, 2.4rem);
  @include font-size("xl");
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
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
  font-size: 14px;      /* smaller text */
  color: #fff;
  margin-bottom: 10px;
  line-height: 20px;    /* tighter spacing */
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
  max-width: 600px; /* match the logline width */
  aspect-ratio: 16 / 9;
  height: auto;
  margin: 16px 0;
  background: #000;
  align-self: flex-start;
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
.film-subtitle-row .dot,
.awards-title .dot,
.info-labels .dot {
  margin: 0 8px;          /* equal horizontal spacing */
  font-size: 14px;        /* keep dot size consistent */
  color: #e0e0e0;         /* same gray tone */
  vertical-align: middle; /* keeps it centered vertically */
  display: inline-block;  /* prevents collapsing on small screens */
  line-height: 1; 
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
  margin-bottom: 6px;
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

.awards-list {
  display: flex;
  flex-direction: column;
  gap: 0; /* Minimal spacing for a cleaner stack */
  margin-bottom: 0; /* Remove extra space below awards */
}

.award-row {
  padding: 8px 0 4px 0;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  transition: background 0.2s;
  cursor: pointer; /* ensures hover trigger always works */
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

.article-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.article-bullet {
  width: 5px;
  height: 5px;
  background-color: #fff;
  border-radius: 50%;
  flex-shrink: 0;
  transform: translateY(-0.5px);
  /* Key alignment fixes */
  display: inline-block;
  align-self: center;
}

.article-link {
  font-family: "proxima-nova", sans-serif;
  font-size: 16px;
  font-style: italic;
  text-transform: uppercase;
  color: #fff;
  text-decoration: none;
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
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
}

/* Frame: subtle scale + fade */
.modal-fade-enter-active .frame,
.modal-fade-leave-active .frame {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-fade-enter-from .frame {
  transform: scale(0.97);
  opacity: 0;
}

.modal-fade-enter-to .frame {
  transform: scale(1);
  opacity: 1;
}

.modal-fade-leave-to .frame {
  transform: scale(0.97);
  opacity: 0;
}
.scroll-indicator {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 1.5s infinite;
  opacity: 0.7;
  pointer-events: none;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(6px);
  }
  60% {
    transform: translateX(-50%) translateY(3px);
  }
}

.info-labels a,
.info-labels a:visited {
  color: #fff;                /* White text always */
  text-decoration: none;      /* Remove default underline */
}

.info-labels a:hover,
.info-labels a:focus {
  color: #593792;             /* Your hover color */
  text-decoration: underline; /* Add custom underline on hover */
}

/* --- Tablet & smaller (≤1025px) --- */
@media (max-width: 1025px) {
  .frame {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 92vw;
    height: auto;
    padding: 32px 24px 40px;
    overflow-y: auto;
  }

  /* Hide poster image for simplicity */
  .image {
    display: none;
  }

  .modal-scrollable-content {
    width: 100%;
    margin: 0;
    padding: 0;
    text-align: center;
    align-items: center;
  }

  .text-wrapper {
    font-size: 32px;
    line-height: 1.2;
    text-transform: uppercase;
    margin-top: 16px;
    margin-bottom: 8px;
  }

  .film-subtitle-row {
    font-size: 15px;
    color: #ccc;
    margin-bottom: 16px;
    justify-content: center;
  }

  .div {
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 16px;
    color: #eee;
    text-align: left;
    max-width: 600px;
  }

  .info-labels {
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 16px;
    text-align: center;
  }

  .trailer-video {
  width: 100%;
  max-width: 600px; /* align with loglines */
  aspect-ratio: 16 / 9;
  align-self: center;
  margin: 20px auto 16px auto;
}

  .awards-section,
  .article-list-section {
    width: 100%;
    max-width: 600px; /* matches trailer */
    align-self: center;
    margin: 16px auto 0 auto;
    text-align: left;
    box-sizing: border-box;
    padding: 0;
  }

  .section-heading,
  .awards-title {
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 12px;
  }

  .close-modal-button {
    top: 16px;
    right: 16px;
  }
}

/* --- Mobile (≤640px) --- */
@media (max-width: 640px) {
  .text-wrapper {
    font-size: 24px;
    margin-top: 8px;
  }

  .film-subtitle-row {
    font-size: 13px;
    margin-bottom: 12px;
  }

  .div {
    font-size: 13px;
    line-height: 1.5;
    padding: 0 8px;
  }

  .info-labels {
    font-size: 13px;
    line-height: 1.4;
  }

  .trailer-video {
    width: 100%;
    max-width: 90%;
    aspect-ratio: 16 / 9;
    align-self: center;
    margin: 12px auto;
  }

  .awards-section,
  .article-list-section {
    max-width: 90%;
    margin: 12px auto 0 auto;
    text-align: left;
    padding: 0;
  }

  .section-heading,
  .awards-title {
    font-size: 12px;
  }
}

.label-link.no-hover {
  pointer-events: none;
  color: #fff;
  text-decoration: none;
  cursor: default;
}

@media (max-width: 768px) {
  .trailer-video {
    width: 100%;
    max-width: 550px;
    aspect-ratio: 16 / 9;
    align-self: center;
    margin: 16px auto 12px auto;
  }

  .awards-section,
  .article-list-section {
    width: 100%;
    max-width: 550px; /* match trailer */
    align-self: center;
    margin: 12px auto 0 auto;
    text-align: left;
    padding: 0;
  }
}

/* Tablet landscape ≤1025px */
@media (max-width: 1025px) {
  .awards-title,
  .award-name,
  .award-year-status,
  .award-category,
  .award-extra {
    font-size: 15px;
    line-height: 1.5;
  }
}

/* Tablet portrait ≤768px */
@media (max-width: 768px) {
  .awards-title,
  .award-name,
  .award-year-status,
  .award-category,
  .award-extra {
    font-size: 14px;
    line-height: 1.5;
  }
}

/* Mobile ≤640px */
@media (max-width: 640px) {
  .awards-title,
  .award-name,
  .award-year-status,
  .award-category,
  .award-extra {
    font-size: 13px;
    line-height: 1.4;
  }
}

/* Small mobile ≤480px */
@media (max-width: 480px) {
  .awards-title,
  .award-name,
  .award-year-status,
  .award-category,
  .award-extra {
    font-size: 12px;
    line-height: 1.3;
  }
}
</style>