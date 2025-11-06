<template>
  <transition name="fade">
    <div class="video-modal" @click.self="close" tabindex="-1">
      <div class="video-wrapper">
        <!-- Close (X) button -->
        <button class="close-modal-button" @click="close" aria-label="Close">
  <svg width="20" height="20" viewBox="0 0 20 20" stroke="#fff" stroke-width="1.5" fill="none" stroke-linecap="round">
    <line x1="5" y1="5" x2="15" y2="15"/>
    <line x1="15" y1="5" x2="5" y2="15"/>
  </svg>
</button>
        <iframe
          v-if="video?.youtube_url"
          id="ytplayer"
          :src="autoplayUrl"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
          title="Music Video"
        ></iframe>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, watch } from "vue";

const props = defineProps({
  video: { type: Object, required: true },
  close: { type: Function, required: true }
});

const autoplayUrl = computed(() => {
  if (!props.video?.youtube_url) return "";
  const hasQuery = props.video.youtube_url.includes("?");
  const sep = hasQuery ? "&" : "?";
  return `${props.video.youtube_url}${sep}autoplay=1&enablejsapi=1`;
});

function handleKeydown(e) {
  if (e.key === "Escape") props.close();
}

function initYouTubePlayer() {
  if (!window.YT || !window.YT.Player) return;
  new window.YT.Player("ytplayer", {
    events: {
      onStateChange: (event) => {
        if (event.data === window.YT.PlayerState.ENDED) {
          props.close();
        }
      }
    }
  });
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);

  // Wait a bit so the iframe is mounted
  setTimeout(() => {
    if (window.YT && window.YT.Player) {
      initYouTubePlayer();
    } else {
      window.onYouTubeIframeAPIReady = initYouTubePlayer;
    }
  }, 500);
});

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
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
}

.video-wrapper {
  position: relative;
  width: clamp(280px, 80vw, 900px);
  height: clamp(200px, 70vh, 560px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: clamp(32px, 5vh, 48px);
}

.video-wrapper iframe {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 6px;
}

/* --------- Responsive Scaling ---------- */

/* Large screens ≤ 1200px */
@media (max-width: 1200px) {
  .video-wrapper {
    width: 85vw;
    max-width: 800px;
  }
}

/* Medium screens ≤ 992px */
@media (max-width: 992px) {
  .video-wrapper {
    width: 90vw;
    max-width: 700px;
  }
}

/* Tablets ≤ 768px */
@media (max-width: 768px) {
  .video-wrapper {
    width: 95vw;
    max-width: 640px;
  }

  .close-modal-button {
    width: clamp(24px, 6vw, 32px);
    height: clamp(24px, 6vw, 32px);
  }
}

/* Small phones ≤ 480px */
@media (max-width: 480px) {
  .video-wrapper {
    width: 100%;
    max-width: 420px;
    aspect-ratio: 16 / 9;
  }

  .close-modal-button {
    width: 28px;
    height: 28px;
    transform: translate(30%, -30%);
  }
}

/* --------- Smooth Fade Transition ---------- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.close-modal-button {
  position: absolute;
  top: 0;                /* Aligns with top edge of iframe */
  right: 0;              /* Aligns with right edge of iframe */
  transform: translate(40%, -40%); /* Moves it slightly out, so it's not covering video */
  z-index: 10;
  background: rgba(0, 0, 0, 0.6);  /* Subtle backdrop for contrast */
  border: none;
  color: #fff;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  transition: transform 0.15s ease, opacity 0.15s ease, background-color 0.15s ease;
}

.close-modal-button:hover {
  transform: translate(40%, -40%) scale(1.08);
  opacity: 0.9;
}

.close-modal-button:hover svg {
  filter: brightness(0.7);
  transition: filter 0.15s;
}


</style>
