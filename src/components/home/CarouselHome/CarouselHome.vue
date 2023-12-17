<template>
    <v-carousel hide-delimiters>
      <v-carousel-item src="@/assets/banner/casa1.jpg" @click="redirectIlustration(1)"></v-carousel-item>
      <v-carousel-item src="@/assets/banner/casa2.jpg" @click="redirectIlustration(2)"></v-carousel-item>
      <v-carousel-item src="@/assets/banner/casa3.jpg" @click="redirectIlustration(3)"></v-carousel-item>
      
    </v-carousel>
  </template>
    
  <script setup>
  import { useRouter } from 'vue-router';
  const routes = useRouter()
  const redirectIlustration = (id) =>{
    routes.push(`/ilustration/${id}`)
  }
  </script>
    
  <style scoped></style>