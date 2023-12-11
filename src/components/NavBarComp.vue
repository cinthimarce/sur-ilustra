<template>
  <div class="desktop d-md-none">
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
      <v-row>
        <v-img
          src="../assets/banner/logo2.png"
          max-height="70"
          max-width="90"
        ></v-img>
      </v-row>
      <!-- <v-app-bar-title>Sur Ilustra</v-app-bar-title> -->
    </v-toolbar>
    <!-- NavBar Mobile Toolbar - MdiMenu navicon-->
  </div>

  <!-- NavBar Desktop-->
  <div class="desktop d-none d-md-flex">
    <v-image image="img/logo.png" size="40"></v-image>
    <v-app-bar :elevation="0" color="senary">
      <v-row d-flex justify="center">
        <v-img
          src="../assets/banner/logowhite.png"
          max-height="40"
          max-width="60"
          pl-10
          contain
        ></v-img>
        <h3 class="logo-text pt-3">Humberto Vera</h3>
      </v-row>
      <v-row d-flex justify="center">
        <!-- Selected NavBar Desktop-->
        <v-tabs
          v-model="tab"
          color="primary"
          align-tabs="center"
          hide-slider=false
          v-for="item in itemsNav"
          :key="item.name"
        >
          <v-tab
            class="tab-family pb-4"
            direction="left"
            :to="item.to"
            :value="item.tab"
            >{{ item.name }}</v-tab
          >
        </v-tabs>

        <v-badge :content="cartStore.cartTotalProducts" color="primary">
          <v-btn icon="mdi-cart" to="/cart"></v-btn>
        </v-badge>
       
      </v-row>
    </v-app-bar>
  </div>
</template>
 
<script setup>
import { ref } from "vue";
import { useCartStore } from '../stores/cart';

const cartStore = useCartStore();
const drawer = ref(false);
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
  color: #556560 !important;
  /* background-color: #f7f7f7 !important; */
}
.tab-family {
  /* font-family: "Bellefair", serif; */
  font-family: "Marcellus", serif;
}
.logo-text {

  font-family: "Homemade Apple", cursive;
  font-size: 1.2rem;
}
</style>
