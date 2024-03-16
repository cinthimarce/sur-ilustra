<template>
    <v-carousel hide-delimiters cycle >
      <v-carousel-item src="@/assets/banner/casa1.webp" @click="redirectTo()"></v-carousel-item>
      <v-carousel-item class="d-flex justify-content-center align-items-center " >
        <v-card class="d-flex align-items-center fill-height pt-4 mx-auto item" elevation="0">
          <v-card-text class="d-flex justify-center align-center">
            <v-card-text class="text-h6 text-center font-carrusel ">
              Bienvenido al taller Enmarca  Aysén, conoce mi obras inspiradas en edificaciones antiguas y animales representativos de la región de Aysén.
            </v-card-text>
          </v-card-text>
        </v-card>
      </v-carousel-item>
      <v-carousel-item src="@/assets/banner/avecilla1.webp" @click="redirectTo()"></v-carousel-item>
      <v-carousel-item>
        <v-card class="d-flex align-items-center fill-height pt-4 mx-auto item" elevation="0">
          <v-card-text class="d-flex justify-center align-center">
            <v-card-text class="text-h6 text-center font-carrusel ">
              Las obras se realizan a mano alzada en base a acuarela y tinta, los papeles aseguran la calidad y durabilidad de cada una de las piezas .
            </v-card-text>
          </v-card-text>
        </v-card>
      </v-carousel-item>
      <v-carousel-item src="@/assets/banner/casa2.webp" @click="redirectTo()"></v-carousel-item>
      <v-carousel-item>
        <v-card class="d-flex align-items-center fill-height pt-4 mx-auto item" elevation="0">
          <v-card-text class="d-flex justify-center align-center">
            <v-card-text class="text-h6 text-center font-carrusel ">
              Cada acuarela se encuentra firmada con un cuño seco, correspondiente a un anagrama de las iniciales de mi nombre, Humberto Adolfo Vera Núñez.
            </v-card-text>
          </v-card-text>
        </v-card>
      </v-carousel-item>
      <v-carousel-item src="@/assets/banner/avecilla2.webp" @click="redirectTo()"></v-carousel-item>
      <v-carousel-item src="@/assets/banner/casa3.webp" @click="redirectTo()"></v-carousel-item>
    </v-carousel>
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
    font-family: 'Homemade Apple', cursive !important;
    color: #315467;
    line-height: 1.5;

  }
  .min{
  display: flex;
  flex-wrap: wrap;
  }
  .item {
  width: 100%;
  }

@media (min-width: 150px) {
  .item {
  width: 80%;
  }
}

@media (max-width: 1024px) {
  .item {
  width: 50%;
  }
}
  
  </style>