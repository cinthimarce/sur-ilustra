<template>
    <v-container class="pa-4 text-center">
        <BreadcrumbsComp :rutas="rutas" />
        <BaseGallery :productos="ilustrations" @redirectTo="redirectIlustration" />
    </v-container>
</template>

<script setup>
import BaseGallery from './base/BaseGallery.vue';
import { useGalleryStore } from '@/stores/gallery';
import BreadcrumbsComp from './base/BreadcrumbsComp.vue';
import { useRouter } from 'vue-router';


const route = useRouter()

const galleryStore = useGalleryStore()
const ilustrations = galleryStore.galleryProducts.ilustrations

const redirectIlustration = (title,id) => {
    route.push(`/ilustration/${title}/${id}`)
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