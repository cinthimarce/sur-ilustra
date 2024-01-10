<template>
    <div>
        <NavBarAdminMobile :items-nav="itemsNav"/>
    </div>
</template>

<script setup>
    
import {} from 'vue'
import NavBarAdminMobile from './IsMobile/NavBarAdminMobile.vue';

    const itemsNav = [
    {
        name: "Productos",
        icon: "mdi-home",
    },
    
];
</script>

<style scoped>
    
</style>