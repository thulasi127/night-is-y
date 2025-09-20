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
                <template v-for="(name, j) in member.names" :key="j">
                  <span class="label-link">{{ name }}</span>
                  <span v-if="j < member.names.length - 1" class="dot">&#183;</span>
                </template>
              </span>
            </template>
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
  width: 1580px;
  height: 620px;              /* Shortened height */
  margin-top: 48px;           /* Space below navbar */
  margin-bottom: 48px;        /* Equal space from bottom */
  background: rgba(0, 0, 0, 0.85);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: row;
  align-items: center;
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
  align-self: center;          /* vertically center poster */
}
.modal-scrollable-content {
  width: 1200px;
  height: 560px;              /* Adjusted for new modal height */
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  justify-content: center;
  padding-top: 32px;
  padding-right: 40px;
  overflow-y: auto;
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
  width: 100%;
  max-width: 950px;
  aspect-ratio: 16 / 9;
  height: auto;
  border-radius: 0; /* or 4px for a subtle curve */
  margin-top: 16px;
  margin-bottom: 0;
  display: block;
  background: #000;
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
  gap: 2px;
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

.section-heading {
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 1px;
  color: #fff;
  font-family: "Neue Montreal", sans-serif;
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
  font-family: "Neue Montreal", sans-serif;
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