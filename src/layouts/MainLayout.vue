<template>
    <div class="container">
        <div class="nav-bar">
            <NavBarComp/>
        </div>
        <v-container>
            <div class="slot">
                <slot name="main"/>
            </div>
        </v-container>
        <div class="footer">
            <FooterComp/>
        </div>
    </div>
</template>

<script setup >
import NavBarComp from "@/components/navBar/NavBarComp.vue"
import FooterComp from '@/components/footer/FooterComp.vue'

</script>

<style scoped>
.slot{
    padding-top:100px;
    padding-bottom: 10rem;
    width: 100%;

    }
</style>