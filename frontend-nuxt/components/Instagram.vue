<template>
  <img
    :class="['instagram', className]"
    alt="Size"
    :src="img"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Instagram",
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
      default: "https://c.animaapp.com/2lD2yyWL/img/size-48-1.svg",
    },
  },
});
</script>

<style>
.instagram {
  height: 48px;
  left: 0;
  position: absolute;
  top: 0;
  width: 48px;
}
</style>
