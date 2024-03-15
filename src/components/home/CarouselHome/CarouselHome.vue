<template>
  <v-carousel hide-delimiters>
    <!-- <v-carousel-item src="@/assets/banner/casa1.webp" ></v-carousel-item>
    <v-carousel-item src="@/assets/banner/casa2.webp" ></v-carousel-item>
    <v-carousel-item src="@/assets/banner/casa3.webp" ></v-carousel-item>
    <v-carousel-item src="@/assets/banner/avecilla1.webp" @click="redirectTo('Gorrión')"></v-carousel-item>
    <v-carousel-item src="@/assets/banner/avecilla2.webp" @click="redirectTo('Chucao')"></v-carousel-item> -->    
      
        <v-carousel-item v-for="item in avecillas" :key="item.id"
        :src="item.imagen1" @click="redirectAvecilla(item.nombre,item.id)" 
      ></v-carousel-item>
     
      <v-carousel-item
        v-for="item in ilustracionesFiltradas" :key="item.id"
        :src = "item.imagen1"
        @click="redirectIlustracion(item.nombre,item.id)"
      ></v-carousel-item>
    </v-carousel>
  </template>
    
<script setup>
import { useRouter } from 'vue-router';
import { useGaleriaStore } from '@/stores/galeria';
const galeriaStore = useGaleriaStore();
const avecillas = galeriaStore.avecillasGalery
const ilustraciones = galeriaStore.ilustrationsGalery
const nombresIlustraciones = ['Casa 21 de Mayo','Casa El Granero','Casa Simpson']
const ilustracionesFiltradas =ilustraciones.filter(item => nombresIlustraciones.includes(item.nombre))
//console.log(ilustracionesFiltradas)
// console.log(avecillas);
// console.log(ilustraciones);

const route = useRouter()
const redirectAvecilla = (nombre,id) =>{
    route.push({
        name:'avecillasDetails',
        params: {nombre},
        query: {id}
    })
}
const redirectIlustracion = (nombre,id) =>{
  route.push({
    name:'ilustrationDetails',
    params: {nombre},
    query: {id}
  })
}
</script>
    
<style scoped>
.cursor{
  cursor: pointer;
}
</style>