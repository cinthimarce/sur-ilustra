<template>

  <div class="desktop" v-if="isMobile">
    <!-- Color Background Menu Mobile -->
    
    <v-navigation-drawer
      temporary
      location="left"
      absolute
      app
      v-model="drawer"
      color="primary"
    >
    
      <v-layout class="mt-4 d-flex flex-column text-right">
        <div class="d-flex justify-left">
          <v-img
            src="../assets/banner/logo.png"
            max-height="80"
            max-width="100"
            contain
          >
          </v-img>
        </div>
      </v-layout>
      
      <!-- Hover Menu Mobile -->
      <v-list>
        <v-list-item
          v-for="(item, i) in itemsNav"
          :key="i"
          :value="item"
          color="denary"
          :to="item.to"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title class="sub-titulo">{{
            item.name
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <!-- Hover Menu Mobile -->

    </v-navigation-drawer>
    
    <!-- NavBar Mobile Toolbar - MdiMenu navicon-->
    <v-toolbar app dark prominent color="senary">
      
      <v-app-bar-nav-icon size="60" @click="drawer = !drawer" color="secondary"> 
      </v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-row >
        <v-img
            src="../assets/banner/logo2.png"
            max-height="80"
            max-width="100"       
          ></v-img>
      </v-row>  
      <!-- <v-app-bar-title>Sur Ilustra</v-app-bar-title> -->
    </v-toolbar>
   <!-- NavBar Mobile Toolbar - MdiMenu navicon--> 
  
  </div>
  <!-- NavBar Desktop--> 
  
  <div class="desktop" v-if="!isMobile">
    <v-image image="img/logo2.png" size="80"></v-image>
    <v-app-bar :elevation="0" color="quinary">
      <v-row d-flex justify="center" >
        <v-img
          src="../assets/banner/logo2.png"
          max-height="80"
          max-width="100"
          pl-10
          contain
        ></v-img>
      </v-row>
      <v-row d-flex justify="center">
      <!-- Selected NavBar Desktop-->   
        <v-tabs
          v-model="tab"
          color="senary"
          align-tabs="center"
          hide-slider="false"
          v-for="item in itemsNav"
          :key="item.name"
        >
          <v-tab
            class="tab-family"
            direction="left"
            :to="item.to"
            :value="item.tab"
            >{{ item.name }}</v-tab
          >
        </v-tabs>
      </v-row>
    </v-app-bar>
  </div>
</template>
 
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
const isMobile = ref(window.innerWidth < 500);
const handleResize = () => {
  isMobile.value = window.innerWidth < 500;
};
onMounted(() => {
  window.addEventListener("resize", handleResize);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
const drawer = ref(true);
const tab = ref(null);
const itemsNav = [
  {
    name: "Inicio",
    icon: "mdi-home",
    to: "/",
  },
  {
    name: "Ilustración",
    to: "/ilustration",
    icon: "mdi-draw",
  },
  {
    name: "Escultura",
    icon: "mdi-drawing",
    to: "/scult",
  },
  {
    name: "Tienda",
    icon: "mdi-cart-outline",
    to: "/shop",
  },
  {
    name: "Sobre",
    icon: "mdi-information-variant",
    to: "/about",
  },
  {
    name: "Contacto",
    icon: "mdi-cellphone-message",
    to: "/contact",
  },
];
</script>
 
<style scoped>
.nav {
  display: flex;
  flex-direction: column;
  padding-left: 20px;
}
.v-tab:hover {
  color: #8AA49B !important;
  background-color: #f7f7f7 !important;
}
.tab-family {
  font-family: "Bellefair", serif;
}
</style>
