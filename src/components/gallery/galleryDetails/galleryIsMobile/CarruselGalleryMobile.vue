<template>
  <v-carousel :show-arrows="false">
    <v-carousel-item
      v-for="(item,i) in props.imageCarousel"
      :key="i"
      :src="item.url"
      cover
    ></v-carousel-item>
  </v-carousel>
</template>
  
<script setup>
import {defineProps} from 'vue'

const props = defineProps({
  imageCarousel: Object
})
  
</script>
  <style scoped></style>