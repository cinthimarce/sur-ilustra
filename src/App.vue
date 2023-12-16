<template>
  <v-app id="app">
    <Transition>
      <router-view />
    </Transition>
  </v-app>
</template>
 
<script setup>
  import { useCartStore } from "./stores/cart";
  const cartStore = useCartStore();
  cartStore.initializeGallery();
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
v-enter-to {
  opacity: 0;
}

#app {
  font-family: "Roboto", "Homemade Apple", Arial, Helvetica, sans-serif;
}
</style>