<template>
    <v-carousel  hide-delimiters v-for="(item, index) in props.imageCarrusel" :key="index" >
      <v-carousel-item  :src="item.url" :alt="item.alt">
      </v-carousel-item>
    </v-carousel>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps('imageCarrusel')
  </script>
  
  <style scoped></style>