<template>
    <v-card-actions class="justify-center">
            <v-btn class="color-bg-cart px-6 mb-4 ml-1" variant="text" color="septenary"
            @click="addProduct(props.ilustration)">Agregar al Carrito</v-btn>
    </v-card-actions>
</template>

<script setup>
    
import { defineEmits, defineProps } from 'vue'

const props = defineProps(['ilustration'])

const emit = defineEmits(['addProduct'])

const addProduct =() =>{
    emit('addProduct',props.ilustration)
}
    
</script>

<style scoped>
.color-bg-cart{
    background-color: #e3f26d;
}
</style>