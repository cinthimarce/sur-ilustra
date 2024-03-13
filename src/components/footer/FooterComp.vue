<template>
    <v-footer class=" text-center d-flex flex-column" color="senary" elevation="2" app>
        <div>
            <v-btn v-for="icon in icons" :key="icon" class="mx-0" :icon="icon.name" variant="text" color="white"
                @click="redirectTo(icon.to)">
                
            </v-btn>
        </div>

        <div class="pt-1 sur">
            ® Humberto Vera
        </div>

        <v-divider></v-divider>

        <div class="footer-family">
            <!-- {{ new Date().getFullYear() }} -->Desarrollado en <strong></strong> Vue3 por ® Agencia Relieve
        </div>
    </v-footer>
</template>
<script setup>
const icons = [
    {
        name: 'fa-brands fa-etsy',
        to: 'https://www.etsy.com/es/',

    },
    {
        name: 'mdi:mdi-instagram',
        to: 'https://www.instagram.com/humberto.ilustra/',

    },

]

const redirectTo = (url) => {
    window.open(url, '_blank')
}
</script>

<style scoped>
.footer-family {
    font-family: 'Courier New';
    font-size: 0.80rem;
}

.sur {
    font-family: 'Homemade Apple', cursive;
}
</style>