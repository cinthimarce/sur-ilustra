<template>
    <div>
        <v-navigation-drawer temporary location="left" absolute app v-model="drawer" color="primary">
            <v-layout class="mt-4 d-flex flex-column text-right">
                <div class="d-flex justify-left">
                    <v-img :src="props.logoOne" max-height="80" max-width="100" contain>
                    </v-img>
                </div>
            </v-layout>

            <!-- Hover Menu Mobile -->
            <v-list>
                <v-list-item v-for="(item, index) in props.itemsNav" :key="index" :value="item" color="denary" :to="item.to">
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
            <v-app-bar-nav-icon size="60" @click="toggleButton" color="secondary">
            </v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <v-row>
                <v-img :src="props.LogoTwo" max-height="70" max-width="90"></v-img>
            </v-row>
            <!-- <v-app-bar-title>Sur Ilustra</v-app-bar-title> -->
        </v-toolbar>
        <!-- NavBar Mobile Toolbar - MdiMenu navicon-->
    </div>
</template>

<script setup>

import { ref, defineProps } from 'vue'

const drawer = ref(false)
const props =defineProps({
    itemsNav: Object,
    logoOne: String,
    LogoTwo: String,
})

const toggleButton = () => {
    drawer.value = !drawer.value
}



</script>

<style scoped></style>