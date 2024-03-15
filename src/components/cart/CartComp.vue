<template>
    <v-container>
        <v-row justify-center>
            <v-col align-center>
                <CartTitle/>
                <CartTable/>
            </v-col>
        </v-row>
    </v-container>
    
</template>

<script setup>
import CartTitle from "./CartTitle.vue"
import CartTable from "./CartTable.vue";
import { useCartStore } from "@/stores/cart";
import {onUpdated} from 'vue'


onUpdated(() => {
    const cartStore = useCartStore()
    const cart = cartStore.getCartList
    console.log(cart);
})

</script>

<style scoped>
    
</style>