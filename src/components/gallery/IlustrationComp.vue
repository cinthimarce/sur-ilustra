<template>
    <v-container class="pa-4 text-center">
        <BreadcrumbsComp :rutas="rutas" />
        <BaseGallery :productos="ilustraciones" @redirectTo="redirectIlustrations" />
    </v-container>
</template>

<script setup>

import BaseGallery from './base/BaseGallery.vue';  
//import { useGalleryStore } from '@/stores/gallery';
import { useGaleriaStore } from '@/stores/galeria.js';
import BreadcrumbsComp from './base/BreadcrumbsComp.vue';
import { useRouter } from 'vue-router';


const route = useRouter()

//const galleryStore = useGalleryStore()
const galeriaStore = useGaleriaStore()

const ilustraciones = galeriaStore.ilustrationsGalery


// const redirectIlustration = (nombre) => {
//     route.push(`/ilustraciones/${nombre}`)
// }
const redirectIlustrations = (nombre,id) => {
    route.push({
        name:'ilustrationDetails',
        params: { nombre },
        query: { id }
    })
}
const rutas = [
    {
        title: 'Inicio',
        disabled: false,
        to: '/'
    },
    {
        title: 'Ilustraciones',
        disabled: true
    }
]
</script>

<style scoped></style>