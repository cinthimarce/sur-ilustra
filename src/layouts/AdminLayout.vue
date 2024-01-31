<template>
    <div class="admin-page">
        <div class="admin-nav-bar">
            <NavBarAdmin/>
        </div>
        <div class="slot-admin">
            <slot name="admin"/>
        </div>
    </div>
</template>

<script setup>
import {} from 'vue'
import NavBarAdmin from '@/components/navBar/NavBarAdmin.vue';
</script>

<style scoped>
.admin-page { 
    display: grid;
    grid-template-columns: 10% 90%;
    width: 100%;
    min-height: 100%;
    inset: 0;
    background: radial-gradient(125% 125% at 50% 10%,#000 40%,#63e 100%);
}



</style>