<template>
    <v-container class="pa-4 text-center">
        <BreadcrumbsComp :rutas="rutas" />
        <BaseGallery :productos="ilustrations" @redirectTo="redirectIlustration" />
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

const redirectIlustration = (id) => {
    route.push(`/ilustration/${id}`)
}
const rutas = [
    {
        title: 'Inicio',
        disabled: false,
        href: '/'
    },
    {
        title: 'Ilustraciones',
        disabled: true
    }
]
</script>

<style scoped></style>