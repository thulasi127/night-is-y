filepath: /Users/tjothiravi/Desktop/client-portfolio/temp/night-is-y/frontend-nuxt/components/KeyboardArrowDown.vue
<template>
  <img
    :class="['keyboard-arrow-down', className]"
    alt="Keyboard arrow down"
    :src="keyboardArrowDown"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "KeyboardArrowDown",
  props: {
    className: {
      type: String,
      default: "",
    },
    keyboardArrowDown: {
      type: String,
      default: "https://c.animaapp.com/2hXfPSxK/img/keyboard-arrow-down.svg",
    },
  },
});
</script>

<style scoped>
.keyboard-arrow-down {
  aspect-ratio: 1;
  height: 24px;
  left: 0;
  position: absolute;
  top: 0;
  width: 24px;
}
</style>