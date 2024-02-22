<template>
    <v-carousel hide-delimiters>
      <v-carousel-item src="@/assets/banner/casa1.webp" @click="redirectIlustration(1)"></v-carousel-item>
      <v-carousel-item src="@/assets/banner/casa2.webp" @click="redirectIlustration(2)"></v-carousel-item>
      <v-carousel-item src="@/assets/banner/casa3.webp" @click="redirectIlustration(3)"></v-carousel-item>
      <v-carousel-item src="@/assets/banner/avecilla1.webp" @click="redirectIlustration(4)"></v-carousel-item>
      <v-carousel-item src="@/assets/banner/avecilla2.webp" @click="redirectIlustration(5)"></v-carousel-item>
    </v-carousel>
  </template>
    
  <script setup>
  import { useRouter } from 'vue-router';
  const routes = useRouter()
  const redirectIlustration = (nombre) =>{
    routes.push(`/ilustraciones/${nombre}`)
  }
  </script>
    
  <style scoped></style>