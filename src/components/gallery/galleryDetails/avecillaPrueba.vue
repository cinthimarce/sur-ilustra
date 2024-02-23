<script setup>
import { useGaleriaStore } from '@/stores/galeria';
import { useRoute } from 'vue-router';
import {onMounted,ref} from 'vue'

const galeriaStore = useGaleriaStore()

const route = useRoute()

const nameAvecilla = route.params.nombre;
const avecillaID = route.query.id;
const avecillas = ref({});
    // Reactive Values

    // Computed Properties

    // Watchers

    // Lifecycle hooks
onMounted(() => {
    avecillas.value = galeriaStore.getAvecillasById(avecillaID);
    console.log(avecillas.value);
})
</script>

<template>
    <h1>{{nameAvecilla}}</h1>
    <h3>{{ avecillaID }}</h3>
    
</template>

<style scoped>
    
</style>