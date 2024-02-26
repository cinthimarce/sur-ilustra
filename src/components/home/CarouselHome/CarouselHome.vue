<template>
    <v-carousel hide-delimiters>
      <v-carousel-item src="@/assets/banner/casa1.webp" @click="redirectTo()"></v-carousel-item>
      <v-carousel-item src="@/assets/banner/casa2.webp" @click="redirectTo()"></v-carousel-item>
      <v-carousel-item src="@/assets/banner/casa3.webp" @click="redirectTo()"></v-carousel-item>
      <v-carousel-item src="@/assets/banner/avecilla1.webp" @click="redirectTo()"></v-carousel-item>
      <v-carousel-item src="@/assets/banner/avecilla2.webp" @click="redirectTo()"></v-carousel-item>
    </v-carousel>
  </template>
    
  <script setup>
  import { defineEmits } from 'vue';

  const emit = defineEmits(['redirectTo'])


const redirectTo = (title,id) => {
  emit('redirectTo', title,id);
};
  </script>
    
  <style scoped></style>