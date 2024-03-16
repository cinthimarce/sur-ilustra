<template>
    <v-card class="mx-auto font" max-width="500" rounded="10" elevation="0" >
        <v-img height="100%" cover src="@/assets/banner/canvas2.png">
            <v-avatar color="grey" size="150" rounded="0">
                <v-img cover src="@/assets/banner/logohv.jpeg"></v-img>
            </v-avatar>
            <v-list-item class="text-white" title="Humberto Vera" subtitle="Artista Visual"></v-list-item>
        </v-img>
    </v-card>

    <v-card class="mx-auto" max-width="500" >
    <v-card-text class="font-weight-regular text-center font pb-0 pt-6 ">Desde que era niño, en ese imaginario personal, siempre existió y se mantuvo fiel hasta el día de hoy, la idea de la relación existente entre hombre y naturaleza.  </v-card-text>
    <v-card-text class="font-weight-regular text-center font pb-6"> Ese olor a leña, a tejuela recién hecha, mezclada con la vegetación húmeda del bosque.  Las imágenes de éstas casitas, responden a cómo éstos materiales naturales una vez vivos , se transformaron en parte del mundo cultural, y como, poco a poco se van transformando nuevamente en naturaleza por el paso de los años. </v-card-text>
    </v-card>
</template>

<script setup>

import { } from 'vue'

</script>

<style scoped>
.font{
    font-family: 'Hepta Slab', serif !important;
    color: #315467 !important;
}
.font2{
    font-family: 'Hepta Slab', serif !important;
    font-size: 0.9rem;
    color: #315467 !important;
}
</style>