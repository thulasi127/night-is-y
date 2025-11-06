<template>
  <transition name="modal-fade">
    <div class="dev-modal-overlay" @click.self="close">
      <div class="frame" role="dialog" aria-modal="true">
        <!-- Close -->
        <button class="close-modal-button" @click="close" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 20 20" stroke="#fff" stroke-width="1.5" fill="none" stroke-linecap="round">
            <line x1="5" y1="5" x2="15" y2="15"/>
            <line x1="15" y1="5" x2="5" y2="15"/>
          </svg>
        </button>

        <!-- Poster image -->
        <img v-if="project.poster" class="image" :alt="project.title" :src="project.poster" />

        <!-- Scrollable right-side content -->
        <div class="modal-scrollable-content">
          <div class="text-wrapper">{{ project.title }}</div>
          <div class="project-subtitle-row">
            <span>{{ project.release_date || 'Coming Soon' }}</span>
          </div>

          <div class="modal-summary-block">
            <h3 class="section-heading">SUMMARY</h3>
            <p class="div">{{ project.summary }}</p>
          </div>

          <!-- Team section -->
<div class="info-labels">
  <template v-for="(member, i) in project.team" :key="i">
    <span>
      <span class="label-title">{{ member.role.toUpperCase() }} | </span>
      <template v-for="(person, j) in member.names" :key="j">
        <template v-if="person.imdb && person.imdb.trim() !== ''">
          <a :href="person.imdb" target="_blank" rel="noopener">
            <span class="label-link">{{ person.name }}</span>
          </a>
        </template>
        <template v-else>
          <span class="label-link no-hover">{{ person.name }}</span>
        </template>
        <span v-if="j < member.names.length - 1" class="dot">&#183;</span>
      </template>
    </span>
  </template>
</div>

          <div v-if="showScrollIndicator" class="scroll-indicator">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
       stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
  name: "DevModal",
  props: {
    project: { type: Object, required: true },
    close: { type: Function, required: true }
  },
  data() {
    return {
      showScrollIndicator: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      const content = this.$el.querySelector('.modal-scrollable-content');
      if (content && content.scrollHeight > content.clientHeight) {
        this.showScrollIndicator = true;
        content.addEventListener('scroll', this.handleScroll);
      }
    });
  },
  beforeUnmount() {
    const content = this.$el.querySelector('.modal-scrollable-content');
    if (content) content.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll(e) {
      this.showScrollIndicator = e.target.scrollTop <= 10;
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

.dev-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 3000;
  display: flex;
  align-items: center;      /* Vertically center */
  justify-content: center;  /* Horizontally center */
  overflow: hidden;
  min-height: 100vh;        /* Ensure full viewport height */
}
.frame {
  position: relative;
  width: clamp(320px, 65vw, 1000px);
  height: clamp(280px, 65vh, 480px);
  padding: clamp(8px, 1.5vw, 20px);
  margin-top: 48px;           /* Space below navbar */
  margin-bottom: 48px;        /* Equal space from bottom */
  background: rgba(0, 0, 0, 0.85);
  border-radius: 0px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  font-family: "proxima-nova", sans-serif;
  overflow: hidden;
}
.image {
  width: 340px;  /* 25% larger */
  height: 500px;
  margin-top: 40px;  /* creates a bit of offset from top padding */
  margin-left: 40px;
  object-fit: cover;
  border-radius: 0px;
  flex-shrink: 0;
  align-self: center;         /* vertically center poster */
}
.modal-scrollable-content {
  margin-left: 40px;
  margin-top: 40px; /* aligns with poster top visually */
  height: 500px;    /* matches poster height */
  width: 1200px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;       /* tighter grouping */
  padding-top: 0; /* keep flush with poster top */
  padding-right: 24px;
  padding-bottom: 40px;
  /* Text flows naturally next to fixed poster */
}
.text-wrapper {
  font-family: "anton", sans-serif;
  font-size: clamp(14px, 3vw, 28px);
  line-height: 1.2;
  margin-bottom: clamp(4px, 1vh, 8px);
  text-align: left;
  color: #fff;
  text-transform: uppercase;
  line-height: 70px;
  margin-bottom: 2px;
  max-width: 100%;
  word-break: break-word;
  overflow: visible;
}
.div {
  font-size: clamp(10px, 1.5vw, 14px);
  color: #fff;
  margin-bottom: 8px;
  line-height: 1.4;
}
.trailer-video {
  margin-top: 6px;
  margin-bottom: 6px;
}
@media (max-width: 1000px) {
  .trailer-video {
    max-width: 100%;
  }
}
.awards-accolades {
  font-size: 14px;
  color: #fff;
  margin-bottom: 8px;
  text-align: center;
}
.project-subtitle-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-family: "proxima-nova", sans-serif;
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
  gap: 2px;
  margin-bottom: 6px;
}
.label-title {
  font-family: "proxima-nova", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
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

/* --- Fullscreen modal by default --- */
.dev-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 3000;
  display: flex;
  align-items: center;      /* vertical center */
  justify-content: center;  /* horizontal center */
  overflow: hidden;
  min-height: 100vh;        /* covers entire viewport */
}

/* --- Large screens (≤1280px) --- */
@media (max-width: 1280px) {
  .frame {
    width: 80vw;
    height: 600px;
  }
  .image {
    width: 240px;
    height: 340px;
  }
  .text-wrapper {
    font-size: 48px;
    line-height: 1.2;
  }
  .modal-scrollable-content {
    width: calc(100% - 280px);
  }
  .div,
  .label-title,
  .label-link,
  .project-subtitle-row {
    font-size: 15px;
  }
}

/* --- Tablet landscape (≤1024px) --- */
@media (max-width: 1024px) {
  .frame {
    width: 90vw;
    height: 560px;
    flex-direction: row;
    align-items: flex-start;
    padding: 20px;
  }
  .image {
    width: 200px;
    height: 280px;
    margin-left: 20px;
  }
  .modal-scrollable-content {
    width: calc(100% - 240px);
    height: 100%;
    margin-left: 20px;
    padding: 16px;
  }
  .text-wrapper {
    font-size: 40px;
    line-height: 1.2;
  }
  .div,
  .label-title,
  .label-link,
  .project-subtitle-row {
    font-size: 14px;
  }
}

/* --- Tablet portrait (≤768px) --- */
@media (max-width: 768px) {
  .frame {
    width: 92vw;
    height: 520px;
    flex-direction: column;
    align-items: center;
    padding: 16px;
  }
  .image {
    width: 180px;
    height: 240px;
    margin: 0 0 16px 0;
  }
  .modal-scrollable-content {
    width: 100%;
    height: calc(100% - 260px);
    padding: 12px;
  }
  .text-wrapper {
    font-size: 32px;
    text-align: center;
  }
  .div,
  .label-title,
  .label-link,
  .project-subtitle-row {
    font-size: 13px;
    text-align: center;
  }
}

/* --- Mobile (≤640px) --- */
@media (max-width: 640px) {
  .frame {
    flex-direction: column;
    width: 95vw;
    height: 520px;
    padding: 10px;
  }
  .image {
    width: 160px;
    height: 220px;
    margin: 0 auto 12px auto;
  }
  .modal-scrollable-content {
    width: 100%;
    height: calc(100% - 240px);
    margin: 0;
    padding: 10px;
  }
  .text-wrapper {
    font-size: 26px;
    line-height: 1.3;
  }
  .div,
  .label-title,
  .label-link,
  .project-subtitle-row {
    font-size: 12px;
    text-align: center;
  }
}

/* --- Small mobile (≤480px) --- */
@media (max-width: 480px) {
  .frame {
    width: 98vw;
    height: 480px;
    padding: 8px;
  }
  .image {
    width: 140px;
    height: 200px;
  }
  .modal-scrollable-content {
    height: calc(100% - 220px);
    padding: 8px;
  }
  .text-wrapper {
    font-size: 22px;
  }
  .div,
  .label-title,
  .label-link,
  .project-subtitle-row {
    font-size: 11px;
  }
}

/* --- Scroll hint gradient --- */
.modal-scrollable-content::after {
  content: "";
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.8));
  pointer-events: none;
  z-index: 2;
}

/* --- Scroll indicator --- */
.scroll-indicator {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 1.5s infinite;
  opacity: 0.9;
  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.6));
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.scroll-indicator svg {
  stroke-width: 2.5;
  stroke: #ffffff;
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

.label-link.no-hover {
  pointer-events: none;
  color: #fff;
  text-decoration: none;
  cursor: default;
}

.info-labels a,
.info-labels a:visited {
  color: #fff;                /* White text always */
  text-decoration: none;      /* Remove default underline */
}

.info-labels a:hover,
.info-labels a:focus {
  color: #593792;             /* Hover purple */
  text-decoration: underline; /* Add underline only on hover */
}


</style>