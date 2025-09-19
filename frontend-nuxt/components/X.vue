<!-- filepath: /Users/tjothiravi/Desktop/client-portfolio/temp/night-is-y/frontend-nuxt/components/X.vue -->
<template>
  <img
    :class="['x', className]"
    alt="Size"
    :src="img"
    @click="$emit('click')"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "X",
  props: {
    size: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
    img: {
      type: String,
      default: "https://c.animaapp.com/2hXfPSxK/img/size-48.svg",
    },
  },
});
</script>

<style scoped>
.x {
  height: 48px;
  left: 0;
  position: absolute;
  top: 0;
  width: 48px;
}
</style>