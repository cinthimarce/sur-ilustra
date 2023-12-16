<template>
  <MainLayout>
    <template #main>
      <CartComp/>
    </template>
  </MainLayout>
</template>

<script setup>
import MainLayout from '../layouts/MainLayout.vue';
import CartComp from "@/components/cart/CartComp.vue"
  
</script>