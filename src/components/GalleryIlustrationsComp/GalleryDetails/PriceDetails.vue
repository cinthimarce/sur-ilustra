<template>
    <v-card-title class="text-h4 pt-2">
      <div class="color-picture">
        <h4 class="font-weight-light" elevation="0" v-if="!props.checkboxEnmarcado">{{ props.formatCurrency(props.price) }}</h4>
        <h4 v-else>{{ props.formatCurrency(props.priceMarco) }}</h4>
      </div>
      <v-card-text class="text-overline color-picture mt-2 pa-0">
        <div v-if="!props.checkboxEnmarcado">(*Precio por unidad)</div>
        <v-fade-transition hide-on-leave>
          <v-card elevation="0" v-if="props.checkboxEnmarcado" class="mx-auto">
            <div class="color-picture">(*Precio por lámina + marco)</div>
          </v-card>
        </v-fade-transition>
      </v-card-text>
      <div class="ps-1 color-title text-overline font-weight-bold pb-1 pt-3">Agregar Marco</div>
  
      <v-btn-toggle group>
        <v-btn color="septenary" variant="outlined" :outlined="!props.checkboxEnmarcado" @click="toggleCheckbox">
          $10.500
        </v-btn>
      </v-btn-toggle>
    </v-card-title>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  
  const props = defineProps(['checkboxEnmarcado', 'formatCurrency', 'price', 'priceMarco'])

  const emit = defineEmits(['toggleCheckbox'])

  const toggleCheckbox = () => {
  emit('toggleCheckbox')
}
  </script>
  
  <style scoped></style>
