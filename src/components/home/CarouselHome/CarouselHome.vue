<template>
    
    <v-carousel hide-delimiters>
      <v-carousel-item src="@/assets/banner/casa1.webp" @click="redirectTo()"></v-carousel-item> 
      <v-carousel-item src="@/assets/banner/casa2.webp" @click="redirectTo()"></v-carousel-item>
      <v-carousel-item src="@/assets/banner/casa3.webp" @click="redirectTo()"></v-carousel-item>
      <v-carousel-item src="@/assets/banner/avecilla1.webp" @click="redirectTo()"></v-carousel-item>
      <v-carousel-item src="@/assets/banner/avecilla2.webp" @click="redirectTo()"></v-carousel-item>
    </v-carousel>

    <v-card  class="mx-auto" width="850px" elevation="0">
    <v-card-text class="d-flex flex-column fill-height justify-center align-center text-black">
      <p class="text-h6 font-weight-thin mb-4 text-center font-carrusel">
       Cada obra creo es única, están inspiradas en edificaciones que aún se conservan dentro de la región de Aysén.
      </p>
    </v-card-text>
  </v-card>
  </template>
    
  <script setup>




  import { defineEmits } from 'vue';

  const emit = defineEmits(['redirectTo'])
  const redirectTo = (title,id) => {
  emit('redirectTo', title,id);
  };

  


  </script>
    
  <style scoped>
  .font-carrusel{
    font-family: "Homemade Apple", cursive !important;
    
    color: #315467 !important;
  }
  </style>
  