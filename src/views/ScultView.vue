<template>
  <MainLayout>
      <template #main>
          <GalleryComp :galleryData="galeria.esculturas"/>
      </template>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { galeria } from '@/lib/data.js'
import GalleryComp from '@/components/GalleryComp.vue'
 
</script>

<style scoped>
 
</style>