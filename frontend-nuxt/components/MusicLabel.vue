<template>
  <div class="label"><div class="text">Music Videos</div></div>
</template>

<style scoped>
/* Stick the label under the NavBar; it also remains visible while scrolling */
.label {
  position: sticky;
  top: var(--nav-h);   /* sits right below the navbar */
  z-index: 20;
  height: 68px;
  width: 100%;
  pointer-events: none;
}

.text {
  color: #fff;
  font-family: "Helvetica Neue-Regular", Helvetica, Arial, sans-serif;
  font-size: 73.7px;
  letter-spacing: -2.96px;
  line-height: 68px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
}
@media (max-width:1200px){ .text{ font-size: 42px; } .label{ height:56px; } }
</style>
