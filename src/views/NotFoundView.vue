<template>
    <div>
        <div class="error">
            <div class="error-message">
                <h1>Error 404</h1>
                <h1>Page NotFound</h1>
                <router-link to="/"><v-btn color="green">Regresar</v-btn></router-link>
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup>

import { } from 'vue'

</script>

<style scoped>
.error {
    height: 100vh;
    width: 100%;
    background-image: url('@/assets/banner/avecilla404.jpeg');
    background-position: center;
    background-color: #06356C;
    display: flex;
    align-items: center;
    justify-content: center;
}
.error-message{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.error-message h1{
    font-size: 150px;
    font-weight: bold;
}
</style>