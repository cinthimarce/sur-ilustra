<template>
    <v-container class="pa-4 text-center">
        <BreadcrumbsComp :rutas="rutas" />
        <BaseGallery :productos="avecillas" @redirectTo="redirectIlustration"/>
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

const redirectIlustration = (id) => {
    route.push(`/ilustration/${id}`)
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