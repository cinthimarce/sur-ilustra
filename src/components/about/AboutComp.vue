<template>
    <v-card class="mx-auto font" max-width="434" rounded="10">
        <v-img height="100%" cover src="@/assets/banner/canvas2.png">
            <v-avatar color="grey" size="150" rounded="0">
                <v-img cover src="@/assets/banner/logohv.jpeg"></v-img>
            </v-avatar>
            <v-list-item class="text-white" title="Humberto Vera" subtitle="Creador de Enmarcaciones Aysén"></v-list-item>
        </v-img>
    </v-card>

    <v-card class="mx-auto font" max-width="434" :text="description"></v-card>
</template>

<script setup>

import { } from 'vue'
const description =
    "Desde que era niño, en ese imaginario personal, siempre existió y se mantuvo hasta el día de hoy, la idea de la relación existente entre hombre y naturaleza.  Ese olor a leña, a tejuela recién hecha, mezclada con la vegetación húmeda del bosque.  Las imágenes de éstas casitas, responden a cómo éstos materiales naturales una vez vivos , se transformaron en parte del mundo cultural, y como, poco a poco se van transformando nuevamente en naturaleza por el paso de los años. ";

</script>

<style scoped>
.font{
    font-family: 'Hepta Slab', serif !important;
}
</style>