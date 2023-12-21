<template>
  <v-app id="app">
      <router-view />
  </v-app>
</template>
 
<script setup>
  import { useGalleryStore } from "@/stores/gallery.js";
const galleryStore = useGalleryStore()
galleryStore.initializeGallery()
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
v-enter-to {
  opacity: 0;
}

#app {
  font-family: "Roboto", "Homemade Apple", Arial, Helvetica, sans-serif;
}
</style>