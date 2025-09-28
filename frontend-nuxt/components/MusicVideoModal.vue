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
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
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
.video-info {
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
}

.video-title-artist {
  font-size: clamp(0.7rem, 1.5vw, 1rem);
  font-weight: 100;
  letter-spacing: 0.5px;
  color: #fff;
  text-overflow: ellipsis;
  overflow: hidden;
  flex-shrink: 1;
  min-width: 0;
}

.video-title-artist b {
  font-weight: 700;
}

/* Return Button */
.video-return {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  opacity: 1;
  transition: none;
  flex-shrink: unset;
}

.video-return span {
  font-size: 1rem;
  letter-spacing: normal;
}

.return-line {
  width: 32px;
  height: 1px;
  background: #fff;
  opacity: 0.7;
  transition: none;
}

.video-return:hover .return-line {
  width: 32px;
  opacity: 0.7;
}

/* Stack vertically on very small screens */
@media (max-width: 450px) {
  .video-info {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6px;
    white-space: normal;
    text-align: center;
  }

  .video-title-artist {
    font-size: clamp(0.7rem, 2.5vw, 0.85rem);
    line-height: 1.3;
    margin-bottom: 4px;
  }

  .video-return {
    margin-top: 2px;
    align-items: center;
  }
}
</style>
