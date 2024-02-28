<template>
    <v-breadcrumbs class="pt-2 pb-8 v-breadcrumbs" :items="props.rutas" color="septenary">
    <template v-slot:prepend>
      <v-icon class="pr-3" size="small" icon="mdi-home" color="senary"></v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script setup>

import {defineProps} from 'vue'

const props = defineProps(['rutas'])
</script>

<style scoped>
.v-breadcrumbs {
    color: #8AA49B  !important;
}
</style>