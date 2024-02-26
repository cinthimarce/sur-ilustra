<template>
    <v-container class="pa-4 text-center">
        <BreadcrumbsComp :rutas="rutas" />
        <BaseGallery :productos="avecillas" @redirectTo="redirectAvecillas"/>
    </v-container>
</template>

<script setup>
import BaseGallery from './base/BaseGallery.vue';
// import { useGalleryStore } from '@/stores/gallery';
import { useGaleriaStore } from '@/stores/galeria';
import BreadcrumbsComp from './base/BreadcrumbsComp.vue';
import { useRouter } from 'vue-router';



const route = useRouter()
const galeriaStore = useGaleriaStore()
const avecillas = galeriaStore.avecillasGalery
// const galleryStore = useGalleryStore()
// const avecillas = galleryStore.gallery.avecillas

const redirectAvecillas = (nombre,id) => {
    route.push({
        name:'avecillasDetails',
        params: { nombre},
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
        title: 'Avecillas',
        disabled: true
    }
]


</script>

<style scoped></style>