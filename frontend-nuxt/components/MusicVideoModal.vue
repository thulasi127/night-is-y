<template>
  <transition name="fade">
    <div class="video-modal" @click.self="close" tabindex="-1">
      <div class="video-wrapper">
        <iframe
          v-if="video?.youtube_url"
          id="ytplayer"
          :src="autoplayUrl"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
          title="Music Video"
        ></iframe>

        <!-- Artist + Title below the frame -->
        <div class="video-info">
          <span class="video-title-artist">
            <b>{{ video.title.toUpperCase() }}</b> BY {{ video.artist.toUpperCase() }}
          </span>
        </div>

        <!-- Return button (same as about-devery) -->
        <div class="video-return" @click="close">
          <span>Return</span>
          <div class="return-line"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  video: { type: Object, required: true },
  close: { type: Function, required: true }
});

const autoplayUrl = computed(() => {
  if (!props.video?.youtube_url) return "";
  // mirror about-devery: add autoplay & enablejsapi so ESC and end-handling are doable later
  const hasQuery = props.video.youtube_url.includes("?");
  const sep = hasQuery ? "&" : "?";
  return `${props.video.youtube_url}${sep}autoplay=1&enablejsapi=1`;
});

function handleKeydown(e) {
  if (e.key === "Escape") props.close();
}

onMounted(() => window.addEventListener("keydown", handleKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", handleKeydown));
</script>

<style scoped>
/* match about-devery modal overlay + frame exactly */
.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.92); /* less transparent */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.video-wrapper {
  position: relative;
  width: 90vw;
  height: 90vh;
  max-width: 1200px;
  max-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 64px; /* add space for info/return below frame */
}

.video-wrapper iframe {
  width: 90vw;
  height: 90vh;
  max-width: 1200px;
  max-height: 700px;
  border: none;
}

/* Artist + Title styles */
.video-info {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -48px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  pointer-events: none;
  font-family: "proxima-nova", sans-serif;
  font-weight: 100;
  color: #fff;
  opacity: 0.95;
  text-align: center;
  white-space: nowrap;
}

.video-title-artist {
  font-size: 1.1rem;
  font-weight: 100;
  letter-spacing: 1px;
  color: #fff;
}

.video-title-artist b {
  font-weight: 700;
  letter-spacing: 1px;
}

/* Return button (identical styling) */
.video-return {
  position: absolute;
  bottom: -48px;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  cursor: pointer;
  font-family: "proxima-nova", sans-serif;
  font-weight: 100;
  font-style: normal;
  color: #fff;
  opacity: 0.7;
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.video-return:hover {
  opacity: 1;
  transform: translateY(-2px);
}
.video-return span {
  font-size: 14px;
  letter-spacing: 1px;
}
.return-line {
  width: 48px;
  height: 1px;
  background: #fff;
  opacity: 0.5;
  transition: width 0.3s ease, opacity 0.2s ease;
}
.video-return:hover .return-line {
  width: 64px;
  opacity: 1;
}

/* simple fade transition (same timing curve as your site-wide fades) */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from, .fade-leave-to { opacity: 0; }
.fade-enter-to, .fade-leave-from { opacity: 1; }

/* ---------- Large Laptops (≤1440px) ---------- */
@media (max-width: 1440px) {
  .video-wrapper iframe {
    max-width: 1000px;
    max-height: 600px;
  }
  .video-title-artist {
    font-size: 1rem;
    letter-spacing: 0.5px;
  }
  .video-return span {
    font-size: 13px;
  }
}

/* ---------- Tablets & Small Laptops (≤1024px) ---------- */
@media (max-width: 1024px) {
  .video-wrapper {
    width: 90vw;
    height: auto;
    padding-bottom: 48px;
  }

  .video-wrapper iframe {
    width: 90vw;
    height: 50vh;
    max-height: 420px;
  }

  .video-title-artist {
    font-size: 0.95rem;
    letter-spacing: 0.5px;
  }

  .video-return span {
    font-size: 12px;
  }
}

/* ---------- Tablets & Large Phones (≤768px) ---------- */
@media (max-width: 768px) {
  .video-info {
    flex-wrap: wrap; /* Now allows multi-line if too tight */
    justify-content: center;
    gap: 6px;
    padding: 0 8px;
    text-align: center;
  }

  .video-title-artist {
    font-size: 0.95rem;
    text-align: center;
    white-space: normal; /* Wrap title if needed */
  }

  .video-return span {
    font-size: 12px;
  }
}

/* Base styles stay as before */
.video-info {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  white-space: nowrap;
  gap: 12px;
  font-family: "proxima-nova", sans-serif;
  font-weight: 100;
  color: #fff;
  opacity: 0.95;
  text-align: center;
  z-index: 10;
  flex-wrap: nowrap;
}

.video-title-artist {
  font-size: 1.1rem;
  font-weight: 100;
  letter-spacing: 1px;
  color: #fff;
  flex-shrink: 1;
  min-width: 0;
  text-overflow: ellipsis;
  overflow: hidden;
}

.video-title-artist b {
  font-weight: 700;
  letter-spacing: 1px;
}

.video-return {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease, transform 0.2s ease;
  flex-shrink: 0;
  white-space: nowrap;
}

.video-return span {
  font-size: 14px;
  letter-spacing: 1px;
}

.return-line {
  width: 36px;
  height: 1px;
  background: #fff;
  opacity: 0.5;
  transition: width 0.3s ease, opacity 0.2s ease;
}

.video-return:hover .return-line {
  width: 48px;
  opacity: 1;
}

/* ---------- Below 450px: stack return CTA below title ---------- */
@media (max-width: 450px) {
  .video-info {
    flex-direction: column;      /* Stack vertically */
    justify-content: center;
    align-items: center;
    gap: 4px;
    white-space: normal;          /* Allow wrapping if needed */
    text-align: center;
  }

  .video-title-artist {
    font-size: 0.85rem;
    text-align: center;
    line-height: 1.4;
    margin-bottom: 4px;           /* spacing before return CTA */
  }

  .video-return {
    align-items: center;
    margin-top: 4px;
  }

  .video-return span {
    font-size: 12px;
  }

  .return-line {
    width: 28px;
  }

  .video-return:hover .return-line {
    width: 40px;
  }
}


</style>
