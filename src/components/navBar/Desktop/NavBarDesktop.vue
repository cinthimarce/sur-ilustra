<template>
    <div>
        <v-app-bar :elevation=0 color="senary">
            <v-row d-flex justify="center">
                <v-img :src="props.logo" class="logo"
                max-height="40" max-width="60" pl-10 contain @click="redirectHome"></v-img>
                <h3 class="logo-text pt-3" @click="redirectHome">Humberto Vera</h3>
            </v-row>
            <v-row d-flex justify="center">
                <!-- Selected NavBar Desktop-->
                <v-tabs v-model="tab" color="primary" align-tabs="center" hide-slider v-for="item in props.itemsNav"
                    :key="item.name">
                    <v-tab class="tab-family pb-4" direction="left" :to="item.to" :value="item.tab">{{ item.name
                        }}</v-tab>
                </v-tabs>

                <v-badge :content="cartStore.cartTotalProducts" color="primary">
                    <v-btn icon="mdi:mdi-cart" to="/cart"></v-btn>
                </v-badge>

            </v-row>
        </v-app-bar>
    </div>
</template>

<script setup>

import { ref, defineProps } from 'vue'
import { useCartStore } from '@/stores/cart.js'
import { useRouter } from 'vue-router';

const tab = ref(null)
const cartStore = useCartStore()
const route = useRouter()

const props = defineProps({
    logo: String,
    itemsNav: Object
})

const redirectHome = () =>{
    route.push({name:'home'})
}


</script>

<style scoped>
.tab-family {
    /* font-family: "Bellefair", serif; */
    font-family: "Marcellus", serif;
}
.logo {
    cursor: pointer;
}

.logo-text {
    cursor: pointer;
    font-family: "Homemade Apple", cursive;
    font-size: 1.2rem;
}
</style>