<template>
    <v-card-title class="text-h4 pt-2">
        <div class="color-picture">
            <h4  class="font-weight-light" elevation="0" :class="{ 'font-bold': !marcoAgregado }">
                {{ formatCurrency(precioDinamico) }}
            </h4>
        </div>
        <v-card-text class="text-overline color-picture mt-2 pa-0" :class="{ 'font-bold': marcoAgregado }">
            <div>{{ priceText }}</div>
        </v-card-text>
        <div class="ps-1 color-title text-overline font-weight-bold pb-1 pt-3">Agregar Marco</div>
        <v-btn-toggle group>
            <v-btn color="septenary" variant="outlined" :outlined="!marcoAgregado" @click="toggleMarco">
                {{ formatCurrency(priceMarco)}}
            </v-btn>
        </v-btn-toggle>
    </v-card-title>
</template>

<script setup>

import { defineProps,defineEmits } from 'vue'

defineProps(['marcoAgregado', 'precioMostrado', 'priceText','formatCurrency', 'priceMarco','precioDinamico']);

const emit = defineEmits(['toggleMarco']);

const toggleMarco = () => {
  emit('toggleMarco');
};

</script>

<style scoped>
.color-picture{
    color: #315467;
}
.font-bold {
  font-weight: 700;
}
</style>