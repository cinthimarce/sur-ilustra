<template>
    <v-card color="caudex" elevation="0">
        <v-card-title class="text-center justify-center pb-0 mb-0 mt-2">
            <h1 class="font-weight-bold text-h4 text-caudex">
                Finalizar Compra
            </h1>
        </v-card-title>
        <v-window>
            <v-window-item>
                <v-card color="caudex" flat>
                    <v-card-text class="d-flex justify-center text-send">
                        <v-icon class="mr-2">mdi-truck-fast</v-icon> Envíos a todo Chile <v-icon
                            class="ml-2">mdi-truck-fast</v-icon> </v-card-text>
                </v-card>
            </v-window-item>
        </v-window>
    </v-card>
    <v-divider class="pb-2"></v-divider>
    <v-card class="subtext-caudex mb-2" :title="`Carrito(${cartStore.cartCount} Productos)`" variant="tonal" color="caudex">
    </v-card>
</template>

<script setup>

import { useCartStore } from '@/stores/cart';
const cartStore = useCartStore()

</script>

<style scoped>
.text-caudex {
    color: #8AA49B !important;
    font-family: 'Caudex', serif !important;
}

.subtext-caudex {
    color: #315467 !important;
    font-family: 'Caudex', serif !important;
}

.text-send {
    color: #8AA49B !important;
    font-family: 'Hepta Slab', serif !important;
    font-size: 1rem;
}</style>