<template>
    <v-container class="pa-4 text-center">
        <BreadcrumbsComp :rutas="rutas" />
        <BaseGallery :productos="ilustrations" @redirecTo="redirectScults" />
    </v-container>
</template>

<script setup>
import BaseGallery from './base/BaseGallery.vue';
import { useCartStore } from '@/stores/cart.js'
import BreadcrumbsComp from './base/BreadcrumbsComp.vue';
import { useRouter } from 'vue-router';


const route = useRouter()

const cartStore = useCartStore()
const ilustrations = cartStore.galleryProducts.ilustrations

const redirectScults = (nombre) => {
    route.push(`/esculturas/${nombre}`)
}
const rutas = [
    {
        title: 'Inicio',
        disabled: false,
        href: '/'
    },
    {
        title: 'Esculturas',
        disabled: true
    }
]
</script>

<style scoped></style>