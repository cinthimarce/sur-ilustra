<template>
    <div class="admin-page">
        <div class="admin-nav-bar">
            <NavBarAdmin/>
        </div>
        <div class="slot">
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
    display: flex;
}
</style>