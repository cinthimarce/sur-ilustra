<template>
  <v-carousel :show-arrows="true" hide-delimiter-background>
    <v-carousel-item
    :src="props.imageCarousel.imagen1"
    ></v-carousel-item>
    <v-carousel-item
    :src="props.imageCarousel.imagen2"
    ></v-carousel-item>
  </v-carousel>
</template>
  
<script setup>
import {defineProps, onMounted} from 'vue'

const props = defineProps({
  imageCarousel: Object
})
  
onMounted(() =>{
  console.log(props.imageCarousel)
})
</script>
  <style scoped></style>