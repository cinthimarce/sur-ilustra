<template>
    <div>
        <v-navigation-drawer temporary location="left" absolute app v-model="drawer" color="duodenary">
            <v-layout class="mt-4 d-flex flex-column text-right">
                <div class="d-flex justify-space-between">
                    <v-img :src="props.logoOne" max-height="80" max-width="100" contain>
                    </v-img>
                    <v-btn color="transparent" elevation="0" @click="closeDrawer">
                        <v-icon icon="mdi:mdi-close" size="30"></v-icon>
                    </v-btn>
                </div>
                
            </v-layout>

            <!-- Hover Menu Mobile -->
            <v-list>
                <v-list-item v-for="(item, index) in props.itemsNav" :key="index" :value="item" color="secondary" :to="item.to">
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
            <v-app-bar-nav-icon size="60" @click="toggleButton" color="primary">
            </v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <v-row class="d-flex justify-space-around pl-16">
                <!-- <v-icon color="primary"> mdi-cart</v-icon> -->
                <!-- <h3 class="logo-text pt-3">Humberto Vera</h3> -->
                <v-img src="@/assets/banner/logowhite.png" max-height="50" max-width="100" @click="redirectHome"></v-img>
            </v-row>
            <!-- <v-app-bar-title>Sur Ilustra</v-app-bar-title> -->
        </v-toolbar>
        <!-- NavBar Mobile Toolbar - MdiMenu navicon-->
    </div>
</template>

<script setup>


import { ref, defineProps } from 'vue'
import { useRouter } from 'vue-router';

const route = useRouter()
const drawer = ref(false)
const props =defineProps({
    itemsNav: Object,
    //logoOne: String,
    //LogoTwo: String,
    logoOne:{
        required: false,
        type: String
    },
    LogoTwo:{
        required: false,
        type: String
    }
})

const toggleButton = () => {
    drawer.value = !drawer.value
}
const closeDrawer = () => {
    drawer.value = false
}

const redirectHome = () =>{
    route.push({name:'home'})
}


</script>

<style scoped>
.logo-text {

font-family: "Homemade Apple", cursive;
font-size: 1.2rem;
}
.logo-left {
    color: #8AA49B !important;
}
</style>