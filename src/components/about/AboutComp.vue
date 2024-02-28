<template>
    <v-card class="mx-auto" max-width="434" rounded="10">
        <v-img height="100%" cover src="@/assets/banner/canvas2.png">
            <v-avatar color="grey" size="150" rounded="0">
                <v-img cover src="@/assets/banner/logohv.jpeg"></v-img>
            </v-avatar>
            <v-list-item class="text-white" title="Humberto Vera" subtitle="Creador de Enmarcaciones Aysén"></v-list-item>
        </v-img>
    </v-card>

    <v-card class="mx-auto text-description" max-width="434" :text="description"></v-card>
</template>

<script setup>

import { } from 'vue'
const description =
    "Humberto Vera, oriundo de Coyhaique, se caracteriza por ser uno de los mejores acuarelistas de la región Austral de Chile, realizó sus estudios de Pedagogía en Arte en la Universidad de Chile, el año 2012, Humberto mostró un temprano interés por el arte, durante su infancia participó en varios concursos de arte obteniendo los primeros lugares. A la edad de 15 años ya estaba trabajando en una tienda de grabados. Ya como profesional ha realizado varias exposiciones en la Casa de la Cultura de Coyhaique, en la técnica de Acuarela, y se ha desempeñado como profesor y tallerista en distintos establecimientos. ";

</script>

<style scoped>
.text-description{
    font-family: 'Hepta Slab', serif !important;
}
</style>