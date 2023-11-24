<template>
  <v-carousel hide-delimiters >
    <v-carousel-item     
      src="../assets/banner/casa1.jpg"
    ></v-carousel-item>
    <v-carousel-item     
      src="../assets/banner/casa2.jpg"
    ></v-carousel-item>
    <v-carousel-item     
      src="../assets/banner/casa3.jpg" 
    ></v-carousel-item>
    <v-carousel-item     
      src= "../assets/banner/loi.png"
      cover
    ></v-carousel-item>

    <!-- <v-carousel-item     
      v-for="banner in banners"
      :key="banner.id"
      :src="banner.url"
      cover
    ></v-carousel-item> -->

  </v-carousel>
</template>

<script setup>
/* const banners = [
  {
    id: 1,
    url: require("@/assets/banner/loi.png"),
  },
  {
    id: 2,
    url: require("@/assets/banner/casa4.png"),
  },
  {
    id: 3,
    url: require("@/assets/banner/casa2.jpg"),
  },
]; */
</script>

<style scoped>

</style>