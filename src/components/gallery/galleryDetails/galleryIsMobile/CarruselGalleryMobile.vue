<template>
  <v-carousel :show-arrows="true" hide-delimiter-background>
    <v-carousel-item
    :src="props.imageCarousel1"
    ></v-carousel-item>
    <v-carousel-item
    :src="props.imageCarousel2"
    ></v-carousel-item>
  </v-carousel>
</template>
  
<script setup>
import {defineProps} from 'vue'

const props = defineProps({
  imageCarousel1: String,
  imageCarousel2: String,
})
  

</script>
  <style scoped></style>