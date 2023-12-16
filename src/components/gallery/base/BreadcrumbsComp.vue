<template>
    <v-breadcrumbs :items="props.rutas" color="info">
    <template v-slot:prepend>
      <v-icon size="small" icon="mdi-home" color="info"></v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script setup>
    
import {defineProps} from 'vue'

const props = defineProps(['rutas'])
</script>

<style scoped>
    
</style>