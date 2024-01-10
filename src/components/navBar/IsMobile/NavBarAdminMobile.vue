<template>
    <div>
        <v-navigation-drawer temporary location="left" absolute app v-model="drawer" image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg">
            <v-layout class="mt-4 d-flex flex-column text-right">
                <div class="d-flex justify-center">

                    <v-btn color="transparent" elevation="0" @click="toggleButton">
                        <v-icon icon="mdi-close" size="30"></v-icon>
                    </v-btn>
                </div>

            </v-layout>

            <!-- Hover Menu Mobile -->
            <v-list>
                <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" title="Sandra Adams"
                    subtitle="sandra_a88@gmailcom"></v-list-item>
            </v-list>
            <v-divider></v-divider>
           
            <v-list>
                <v-list-item v-for="(item, index) in props.itemsNav" :key="index" :value="item" color=""
                    prepend-icon="item.icon">
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
        <v-btn rounded="xl" color="blue" size="60" class="my-5 mx-5" @click="toggleButton"><v-icon icon="mdi-home" size="50"></v-icon></v-btn>
    </div>
</template>

<script setup>

import { ref, defineProps } from 'vue'
const drawer = ref(false)
const toggleButton = () => {
    drawer.value = !drawer.value
}
const props = defineProps({
    itemsNav: Object
})
</script>

<style scoped>
.navigation {
    height: 100vh;
}
</style>