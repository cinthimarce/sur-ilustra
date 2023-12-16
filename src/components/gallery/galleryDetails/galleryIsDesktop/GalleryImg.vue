<template>
    <v-card width="600"  elevation="0" @mouseover="hover = true" @mouseleave="hover = false">
        <!-- <v-img class="d-flex align-end image-transition" :src="src_image" cover content :class="{'image-hover': hover}">
        </v-img> -->
        <inner-image-zoom :src="src_image"/>
    </v-card>
</template>

<script setup>
import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css';
import InnerImageZoom from 'vue-inner-image-zoom';

import { defineProps, ref } from 'vue'
defineProps({
    src_image: String,
})

const hover = ref(false);

</script>

<style scoped>
.image-transition {
  transition: transform 0.3s, opacity 0.3s;
}

.image-hover {
  transform: scale(1.2); /* Ajusta según el zoom deseado */
  opacity: 0.9; /* Ajusta según la opacidad deseada */
}

</style>