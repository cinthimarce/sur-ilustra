<template>
    <v-card class="mx-auto pt-6 px-4 d-flex py-6 ml-7" width="200" elevation="0">
        <v-btn @click="remove" color="septenary" icon="mdi:mdi-minus" round elevation="0"></v-btn>
        <div class="text-field d-flex align-center mx-4" elevation="0">
            <h3 class="px-4 color-count" elevation="0">{{ count }}</h3>
        </div>
        <v-btn @click="add" color="septenary" icon="mdi:mdi-plus" elevation="0" round></v-btn>
    </v-card>
</template>

<script setup>

import {defineEmits, defineProps } from 'vue'
defineProps ({
    count: Number
})
const emit = defineEmits(['add', 'remove'])

function add() {
    emit('add')
}
function remove(){
    emit('remove')
}

</script>

<style scoped></style>