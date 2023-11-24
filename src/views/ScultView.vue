<template>
  <MainLayout>
      <template #main>
          <GalleryHoverComp :galleryData="galeria.ilustrations"/>
          
      </template>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { galeria } from '@/lib/data.js'
/* import GalleryComp from '@/components/GalleryComp.vue'*/

import GalleryHoverComp from '@/components/GalleryHoverComp.vue';

</script>

<style scoped>
 
</style>