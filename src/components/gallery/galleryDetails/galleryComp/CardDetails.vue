<template>
    <div>
        <v-card-title class="color-title  pb-2 font-bold">{{ props.details.nombre }}</v-card-title>
        <v-card-subtitle class="pt-2 pb-2 color-title text-h6 ">
            <div>{{ props.details.dimensiones }}</div>
        </v-card-subtitle>
        <v-card-text class="pt-2 pb-2 text-caption-2 color-subtitle ">
            <div>{{ props.details.subtitulo }}</div>
        </v-card-text>
        <v-card-text class="pt-2 text-h7 color-price">
            <div>{{ props.details.descripcion }}</div>
        </v-card-text>
    </div>
</template>

<script setup>

import { defineProps } from 'vue'

const props = defineProps(['details'])

</script>

<style scoped>
.font-bold {
    font-family: 'Homemade Apple', cursive;
    font-size: 1.6rem;
    color: #315467;
}

.text-caption-2 {
    font-size: 0.98rem;
}

.color-title {
    color: #315467;
}

.color-subtitle {
    color: rgb(169, 168, 168);
}

.color-price {
    color: #8AA49B;
}
</style>