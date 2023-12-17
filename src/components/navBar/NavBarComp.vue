<template>
    <div class="desktop d-md-none">
        <NavBarMobile :itemsNav="itemsNav" :logoOne="logoOne" :LogoTwo="logoTwo" />
    </div>

    <div class="d-none d-md-flex">
        <NavBarDesktop :logo="logoOne" :itemsNav="itemsNav" />
    </div>
</template>

<script setup>

import NavBarMobile from "../navBar/IsMobile/NavBarMobile.vue"
import NavBarDesktop from "./Desktop/NavBarDesktop.vue";

const logoOne = require('../../assets/banner/logoazul.png');
const logoTwo = require('../../assets/banner/logo2.png');




const itemsNav = [
    {
        name: "Inicio",
        icon: "mdi-home",
        to: "/",
    },
    {
        name: "Ilustración",
        to: "/ilustration",
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
        to: "/scult",
    }, */
    {
        name: "Sobre",
        icon: "mdi-information",
        to: "/about",
    },
    {
        name: "Contacto",
        icon: "mdi-phone",
        to: "/contact",
    },
    {
        name: "Compras",
        icon: "mdi-shopping",
        to: "/cart",
    },
];

</script>

<style scoped></style>