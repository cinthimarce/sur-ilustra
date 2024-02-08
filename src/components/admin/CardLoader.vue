<script setup >

import { defineProps } from 'vue'

// Reactive Values
defineProps({
    loading: Boolean,
    cardText:String
})

// Computed Properties

// Watchers

// Lifecycle hooks

</script>

<template>
    <v-overlay :model-value="loading" class="align-center justify-center" color="rgba(255, 255, 255, 0.6)">
        <v-card class="custom-card">
                <v-card-title primary-title class="text-center" color="primary" elevation-12>
                    <span class="headline mb-4">{{ cardText }}</span>
                </v-card-title>
                <v-progress-circular color="green" indeterminate size="64"></v-progress-circular>
        </v-card>    
    </v-overlay>
</template>

<style scoped>
.custom-card {
    max-width: 500px;
    padding: 30px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.custom-card .headline {
    font-family: 'Roboto', sans-serif;
    color: #333;
}
</style>