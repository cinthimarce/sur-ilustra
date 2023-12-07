<template>
    <v-snackbar v-model="internalSnackbarVisible" :timeout="timeout" color="primary">
      {{ snackBarText }}
      <template v-slot:actions>
        <v-btn color="blue" variant="text" @click="snackbarClosed" icon="mdi-close">
        </v-btn>
      </template>
    </v-snackbar>
  </template>
  
  <script setup>
  import { ref,defineProps, defineEmits } from 'vue';
  const props = defineProps(['value']);
  
  const internalSnackbarVisible = ref(props.value);
  const timeout = 3500;
  const snackBarText = 'Producto agregado al carrito con éxito';
  
  const emit = defineEmits('snackbarClosed');
  
  function snackbarClosed() {
    internalSnackbarVisible.value = false;
    emit('snackbarClosed');  // Emitir evento al cerrar la snackbar
  }
  </script>

<style scoped></style>