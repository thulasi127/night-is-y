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

        <!-- Artist + Title below the frame -->
        <!-- <div class="video-info">
          <span class="video-title-artist">
            <b>{{ video.title.toUpperCase() }}</b> BY {{ video.artist.toUpperCase() }}
          </span>
        </div> -->

        <!-- Return button (same as about-devery) -->
        <!-- <div class="video-return" @click="close">
          <span>Return</span>
          <div class="return-line"></div>
        </div> -->
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

/* Title + Return Row */
/* .video-info {
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: clamp(6px, 2vw, 12px);
  padding: 0 clamp(8px, 3vw, 16px);
  font-family: "proxima-nova", sans-serif;
  font-weight: 100;
  color: #fff;
  opacity: 0.95;
  z-index: 10;
  white-space: nowrap;
  flex-wrap: nowrap;
} */

/* .video-title-artist {
  font-size: clamp(0.7rem, 1.5vw, 1rem);
  font-weight: 100;
  letter-spacing: 0.5px;
  color: #fff;
  text-overflow: ellipsis;
  overflow: hidden;
  flex-shrink: 1;
  min-width: 0;
} */

/* .video-title-artist b {
  font-weight: 700;
} */

/* Return button (old styling restored) */
/* .video-return {
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
} */

/* .video-return:hover {
  opacity: 1;
  transform: translateY(-2px);
} */

/* .video-return span {
  font-size: 14px;
  letter-spacing: 1px;
} */

/* .return-line {
  width: 48px;
  height: 1px;
  background: #fff;
  opacity: 0.5;
  transition: width 0.3s ease, opacity 0.2s ease;
} */

/* .video-return:hover .return-line {
  width: 64px;
  opacity: 1;
} */

/* --------- Breakpoints ---------- */

/* Large screens down from 1200px */
@media (max-width: 1200px) {
  .video-info {
    bottom: -44px;
  }

  .video-title-artist {
    font-size: 1rem;
  }

  .video-return span {
    font-size: 13px;
  }

  .return-line {
    width: 44px;
  }

  .video-return:hover .return-line {
    width: 56px;
  }
}

/* Medium screens down from 992px */
@media (max-width: 992px) {
  .video-info {
    bottom: -40px;
    font-size: 0.95rem;
  }

  .video-title-artist {
    font-size: 0.95rem;
  }

  .video-return span {
    font-size: 12px;
  }

  .return-line {
    width: 40px;
  }

  .video-return:hover .return-line {
    width: 52px;
  }
}

/* Tablets down from 768px */
@media (max-width: 768px) {
  .video-info {
    bottom: -36px;
    font-size: 0.9rem;
  }

  .video-title-artist {
    font-size: 0.9rem;
  }

  .video-return span {
    font-size: 11.5px;
  }

  .return-line {
    width: 36px;
  }

  .video-return:hover .return-line {
    width: 48px;
  }
}

/* Mobile down from 480px */
@media (max-width: 480px) {
  .video-info {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    text-align: center;
    bottom: -32px;
  }

  .video-title-artist {
    font-size: 0.8rem;
    line-height: 1.3;
  }

  .video-return {
    align-items: center;
    gap: 3px;
  }

  .video-return span {
    font-size: 10.5px;
    letter-spacing: 0.5px;
  }

  .return-line {
    width: 28px;
  }

  .video-return:hover .return-line {
    width: 36px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from, .fade-leave-to { opacity: 0; }
.fade-enter-to, .fade-leave-from { opacity: 1; }

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
