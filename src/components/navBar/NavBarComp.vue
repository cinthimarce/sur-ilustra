<template>
    <div class="desktop d-md-none font-menu">
        <NavBarMobile :itemsNav="itemsNavMobile" :logoOne="logoOne" :LogoTwo="logoTwo" :logoThree="logoThree"/>
    </div>

    <div class="d-none d-md-flex">
        <NavBarDesktop :logo="logoOne" :itemsNav="itemsNavDesktop" />
    </div>
</template>

<script setup>

import NavBarMobile from "../navBar/IsMobile/NavBarMobile.vue"
import NavBarDesktop from "./Desktop/NavBarDesktop.vue";

const logoOne = require('../../assets/banner/logowhite.png');
const logoTwo = require('../../assets/banner/logoverde.png');
const logoThree = require('../../assets/banner/logoazul.png');




const itemsNavMobile = [
    {
        name: "Inicio",
        icon: "mdi:mdi-home",
        to: "/",
    },
    {
        name: "Ilustraciones",
        to: "/ilustraciones",
        icon: "mdi:mdi-fountain-pen-tip",
    },
    {
        name: "Avecillas",
        icon: "mdi:mdi-bird",
        to: "/avecillas",
    },
/*     {
        name: "Escultura",
        icon: "mdi:mdi-drawing",
        to: "/esculturas",
    }, */
    {
        name: "Sobre mi",
        icon: "mdi:mdi-information",
        to: "/about",
    },
    {
        name: "Contacto",
        icon: "mdi:mdi-phone",
        to: "/contacto",
    },
    {
        name: "Compras",
        icon: "mdi:mdi-shopping",
        to: "/cart",
    },
];
const itemsNavDesktop = [
    {
        name: "Inicio",
        icon: "mdi:mdi-home",
        to: "/",
    },
    {
        name: "Ilustraciones",
        to: "/ilustraciones",
        icon: "mdi:mdi-fountain-pen-tip",
    },
    {
        name: "Avecillas",
        icon: "mdi:mdi-bird",
        to: "/avecillas",
    },
/*     {
        name: "Escultura",
        icon: "mdi:mdi-drawing",
        to: "/esculturas",
    }, */
    {
        name: "Sobre mi",
        icon: "mdi:mdi-information",
        to: "/about",
    },
    {
        name: "Contacto",
        icon: "mdi:mdi-phone",
        to: "/contacto",
    },
];

</script>

<style scoped>
.font-menu{
    font-family: 'Hepta Slab', serif !important;
}
</style>