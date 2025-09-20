<template>
  <div class="label"><div class="text">Music Videos</div></div>
</template>

<style scoped>
/* Stick the label under the NavBar; it also remains visible while scrolling */
.label{
  height: 68px;              /* matches --label-h */
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.text {
  color: #fff;
  font-family: "Helvetica Neue-Regular", Helvetica, Arial, sans-serif;
  font-size: 73.7px;
  letter-spacing: -2.96px;
  line-height: 68px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
}
@media (max-width:1200px){ .text{ font-size: 42px; } .label{ height:56px; } }

.music-label,
.music-label h1,
.music-label .music-heading {
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-weight: 900;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
</style>
