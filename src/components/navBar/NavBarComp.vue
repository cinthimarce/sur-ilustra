<template>
    <div class="desktop d-md-none font-menu">
        <NavBarMobile :itemsNav="itemsNav" :logoOne="logoOne" :LogoTwo="logoTwo" :LogoThree="logoThree"/>
    </div>

    <div class="d-none d-md-flex">
        <NavBarDesktop :logo="logoThree" :itemsNav="itemsNav" />
    </div>
</template>

<script setup>

import NavBarMobile from "../navBar/IsMobile/NavBarMobile.vue"
import NavBarDesktop from "./Desktop/NavBarDesktop.vue";

const logoOne = require('../../assets/banner/logoverde.png');
const logoTwo = require('../../assets/banner/logoazul.png');
const logoThree = require('../../assets/banner/logowhite.png');




const itemsNav = [
    {
        name: "Inicio",
        icon: "mdi-home",
        to: "/",
    },
    {
        name: "Ilustraciones",
        to: "/ilustraciones",
        icon: "mdi-fountain-pen-tip",
    },
    {
        name: "Avecillas",
        icon: "mdi-bird",
        to: "/avecillas",
    },
/*     {
        name: "Escultura",
        icon: "mdi-drawing",
        to: "/esculturas",
    }, */
    {
        name: "Sobre",
        icon: "mdi-information",
        to: "/about",
    },
    {
        name: "Contacto",
        icon: "mdi-phone",
        to: "/contacto",
    },
    {
        name: "Compras",
        icon: "mdi-shopping",
        to: "/cart",
    },
];

</script>

<style scoped>
.font-menu{
    font-family: 'Hepta Slab', serif !important;
}
</style>