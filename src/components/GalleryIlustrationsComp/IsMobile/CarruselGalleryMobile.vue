<template>
    <v-carousel  hide-delimiters >
      <v-carousel-item :src="props.image_src">
      </v-carousel-item>
      <v-carousel-item :src="props.image_canva">
      </v-carousel-item>
    </v-carousel>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps(['image_src', 'image_canva'])
  </script>
  
  <style scoped></style>